import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-dto.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // boardsService 파라미터에 BoardsService 객체를 타입으로 지정
    // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언 (파라미터 -> 프로퍼티)
    constructor(private boardsService: BoardsService) {}

        
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto 
        ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string ): Board {
        const found =  this.boardsService.getBoardId(id);
        
        if (!found) {
            throw new NotFoundException(`Can't find board id with id ${id}`);
        }

        return found;
    }

    @Delete('/:id')
    DeleteBoard(@Param('id') id: string) : void {
        const found = this.getBoardById(id);
        return this.boardsService.deleteBoard(found.id);
    }

    @Patch('/:id/status')
    updateBoardStatus (
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) : Board {
        // 오ㅐ return type  정의 안해줘도 타입에러가 안나지?
        return this.boardsService.updateBoardStatus(id, status);
    };
}

// 2시간 27분부터