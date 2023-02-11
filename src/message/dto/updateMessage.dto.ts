import { IsNotEmpty } from "class-validator";
import { CreateMessageDto } from "./createMessage.dto";

export class UpdateMessageDto extends CreateMessageDto{
    @IsNotEmpty()
    id: number
}