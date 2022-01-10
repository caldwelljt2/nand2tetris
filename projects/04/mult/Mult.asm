// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.

// Set answer to 0 to start
@R2
M=0

@R0
D=M              // D = first number
@LEAVEASZERO
D;JEQ

@R1
D=M              // D = first number
@LEAVEASZERO
D;JEQ

(MULTIPLY)
@R0
D=M // D = first number
@R2
M=M+D

@R1
D=M-1
M=D
@END
D;JEQ
@MULTIPLY
D;JGT


// @R1


(LEAVEASZERO)
// @R2
// M=0

(END)
@END
0;JMP
// (MULTIPLY)
// // if ( y == n ) goto END
//     @y
//     D=M
//     @n
//     D=D-M
//     @END
//     D;JEQ

//     // RAM[arr + y] = -1
//     @arr
//     D=M
//     @y
//     A=D+M
//     M=-1

//     // y++
//     @y
//     M=M+1
//     @MULTIPLY
//     0;JMP