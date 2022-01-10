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

// Set answer to 0 to start (also create answer var and set it to zero)
@R2
M=0
@answer
M=0


@R0
D=M              // D = first number
@x               // set x = to first number
M=D
@LEAVEASZERO    // just answer zero if we see 0 anywhere
D;JEQ           // this line jumps to above defined line


@R1
D=M             // D = second number
@y              // set y = to 2nd number (so we can modify it in loop)
M=D
@LEAVEASZERO    // just answer zero if we see 0 anywhere
D;JEQ           // this line jumps to above defined line

(MULTIPLY)
@x              // our copy of R0
D=M
@answer
M=M+D

@y              // our copy of R1 that we can modify
D=M-1
M=D
@FINISH         // once our copy gets to zero we can finish
D;JEQ
@MULTIPLY
D;JGT


// @R1


(LEAVEASZERO)
// @R2
// M=0

(FINISH)        // simply copy the answer from our answer to the expected location R2
@answer         // set M to our answer
D=M             // save in D
@R2             // goto expected location
M=D             // put answer from D into R2

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