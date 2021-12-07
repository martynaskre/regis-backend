import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { BusinessService } from '../../business/business.service';

@Injectable()
export class BusinessOwnerGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => BusinessService))
    private readonly businessService: BusinessService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const business = await this.businessService.getBusinessById(
      request.body.businessId,
    );

    if (!business || business.provider.id !== request.user.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
