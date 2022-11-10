import { isNotEmpty } from 'class-validator';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { InSetPinLike } from './dto/in_set_pin_like.dto';
import { Pin, PinDocument } from './schemas/pin.schema';

@Injectable()
export class PinRepository {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: ObjectId,
  ): Promise<Pin> {
    const newPin = new this.pinModel(InCreatePinDto);
    newPin.userId = userId;
    return newPin.save();
  }
  async find(pinFilterQuery: FilterQuery<Pin>): Promise<Pin[]> {
    return this.pinModel.find(pinFilterQuery);
  }

  async findOne(pinFilterQuery: FilterQuery<Pin>): Promise<Pin> {
    return this.pinModel.findOne(pinFilterQuery);
  }

  async setLike(inSetPinLike: InSetPinLike): Promise<boolean> {
    const result = await this.pinModel.aggregate([
      {
        $match: {
          _id: inSetPinLike._id,
        },
      },
      {
        $lookup: {
          from: 'pinLikes',
          localField: '_id',
          foreignField: 'pinId',
          as: 'isLiked',
        },
      },
    ]);
    console.log(result);

    if (result.length == 0) return false;
    else return true;
  }
}
