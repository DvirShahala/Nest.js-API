import { IsNotEmpty, IsEnum } from 'class-validator';

enum Status {
    PUBLISHED = 'published',
    DRAFTED = 'drafted',
    WAITINGFORREVIEW = 'waitingforreview',
    LASTUPDATED = 'lastupdated',
    DATECREATED = 'datecreated'
}

export class PostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsEnum(Status, {
        message: 'Status must be Published or Drafted or WaitingForReview and so on...',
    })
    status: Status;
}