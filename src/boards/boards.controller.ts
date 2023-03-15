import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-dto.dto';

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
    createBoard(
        @Body() createBoardDto: CreateBoardDto 
        ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string ): Board {
        return this.boardsService.getBoardId(id);
    }

    @Delete('/:id')
    DeleteBoard(@Param('id') id: string) : void {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus (
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ) : Board {
        // 오ㅐ return type  정의 안해줘도 타입에러가 안나지?
        return this.boardsService.updateBoardStatus(id, status);
    };
}

// 1시간 57분부터