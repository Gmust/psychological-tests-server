import { Body, Controller, Delete, HttpException, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { CreateTestDto } from './dto/create-test.dto';
import { Roles } from '../utils/roles.decorator';
import { HandleValidationError } from '../utils/handleValidationError';
import { UpdateTestDto } from './dto/update-test.dto';
import { ObjectId } from 'mongoose';

@Controller('tests')
export class TestsController {

  constructor(private testsService: TestsService) {
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create-test')
  async createTest(@Body() createTestDto: CreateTestDto) {
    try {
      const test = await this.testsService.createTest(createTestDto);
      return test;
    } catch (e) {
      HandleValidationError(e);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error occurred',
      }, HttpStatus.FORBIDDEN, {
        cause: e,
      });
    }
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('/update-test')
  async updateTest(@Body() updateTestDto: UpdateTestDto) {
    try {
      const updatedTest = await this.testsService.updateTest(updateTestDto);
      return updatedTest;
    } catch (e) {
      HandleValidationError(e);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error occurred',
      }, HttpStatus.FORBIDDEN, {
        cause: e,
      });
    }
  }


  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('/delete-test')
  async deleteTest(@Body() { testId }: { testId: string | ObjectId },
  ) {
    try {
      await this.testsService.deleteTest(testId);
      return {
        msg: 'Test Successfully deleted!'
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error occurred',
      }, HttpStatus.FORBIDDEN, {
        cause: e,
      });
    }
  }

}
