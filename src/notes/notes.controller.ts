import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Token invalid' })
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Credential was created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Body was invalid',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Duplicate note title',
  })
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.notesService.create(createNoteDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes that belongs to user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Got the notes' })
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(user.id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: "note's id", example: 1 })
  @ApiOperation({ summary: 'Get said note that belongs to user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Got the note' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Note didnt belong to user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Note didnt exist',
  })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.findOne(+id, user.id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: "note's id", example: 1 })
  @ApiOperation({ summary: 'Update said notes that belongs to user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated the note' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Note didnt belong to user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Note didnt exist',
  })
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: CreateNoteDto,
    @User() user: UserPrisma,
  ) {
    return this.notesService.update(+id, updateNoteDto, user.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: "note's id", example: 1 })
  @ApiOperation({ summary: 'Delete said notes that belongs to user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Deleted the note' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Note didnt belong to user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Note didnt exist',
  })
  async remove(@Param('id') id: string, @User() user: UserPrisma) {
    await this.notesService.remove(+id, user.id);
  }
}
