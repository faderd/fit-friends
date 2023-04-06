import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from '../dto/create-review.dto';
import { TrainingService } from '../training/training.service';
import { ReviewEntity } from './review.entity';
import { ReviewQuery } from './query/review.query';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly trainingService: TrainingService,
  ) { }

  async setAverageRate(trainingId: number) {
    const reviews = await this.reviewRepository.findAllByTrainingId(trainingId);
    const sum = reviews.reduce((sum, currentItem) => sum + currentItem.rate, 0);
    const newAverageRate = Math.round(sum / reviews.length);

    const existTraining = await this.trainingService.getTraining(trainingId);

    this.trainingService.updateTraining(trainingId, { ...existTraining, rate: newAverageRate })
  }

  async create(dto: CreateReviewDto, userId: number) {
    const { rate, text, trainingId } = dto;

    await this.trainingService.getTraining(trainingId);

    const review = { rate, text, trainingId, createdAt: new Date(), userId };

    const reviewEntity = new ReviewEntity(review);

    const createdReview = await this.reviewRepository.create(reviewEntity);
    this.setAverageRate(trainingId);

    return createdReview;
  }

  async getById(id: number) {
    const existReview = await this.reviewRepository.findById(id);

    if (!existReview) {
      throw new NotFoundException(id);
    }

    return existReview;
  }

  async getByTrainingId(trainingId: number, query: ReviewQuery) {
    return this.reviewRepository.findByTrainingId(trainingId, query);
  }

  async update(id: number, dto: UpdateTrainingDto) {
    const existReview = await this.getById(id);
    const reviewEntity = new ReviewEntity({ ...existReview, ...dto });
    return this.reviewRepository.update(existReview.id, reviewEntity);
  }
}
