import { IsNotEmpty, IsString } from "class-validator"

export class CreateMessageDto{
    @IsNotEmpty()
    sender: number
    @IsNotEmpty()
    receiver: number
    @IsNotEmpty()
    @IsString()
    text: string
}