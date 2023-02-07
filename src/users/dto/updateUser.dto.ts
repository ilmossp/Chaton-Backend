import { PartialType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import CreateUserDto from "./createUser.dto";

export default class UpdateUserDto extends PartialType(CreateUserDto){
  @IsInt()
  id: number;
}
