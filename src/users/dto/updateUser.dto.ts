import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import CreateUserDto from "./createUser.dto";

export default class UpdateUserDto extends PartialType(CreateUserDto){
  @IsNotEmpty()
  id: number;
}
