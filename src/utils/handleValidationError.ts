import { BadRequestException } from '@nestjs/common';

export const HandleValidationError = (e: any) => {
  if (e.name === 'ValidationError') {
    // @ts-ignore
    const message = Object.values(e.errors).map(value => value.message);
    console.log(message);
    throw  new BadRequestException('Error occurred', { cause: new Error(), description: message[0] });
  }
};