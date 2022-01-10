// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// set RAM[16] = 16384 and RAM[17] = 24575 (or 24576 see notes)
@SCREEN
D=A
@16
M=D

@24576 // Had to add one to make maths easier (like example)
D=A
@17
M=D

// check keyboard buffer and put in D var
@24576
D=M
// JGT jump if value > 0 (to paint the screen black)
@BLACKSCREEN
D;JGT

// removed redundant?
// @24576
// D=M

// JEQ jump if value = 0 (to paint the screen white)
@WHITESCREEN
D;JEQ


// lable a line for a loop to paint the screen black
(BLACKSCREEN)
// if ( screenOn == n ) goto END
    @screenOn
    D=M
    @n
    D=D-M
    @END
    D;JEQ

    // RAM[arr + screenOn] = -1
    @arr
    D=M
    @screenOn
    A=D+M
    M=-1

    // screenOn++
    @screenOn
    M=M+1
    @BLACKSCREEN
    0;JMP


// lable a line for a loop to paint the screen black
(WHITESCREEN)
// if ( screenOn == n ) goto END
    @screenOn
    D=M
    @n
    D=D-M
    @END
    D;JEQ

    // RAM[arr + screenOn] = -1
    @arr
    D=M
    @screenOn
    A=D+M
    M=0

    // screenOn++
    @screenOn
    M=M+1
    @WHITESCREEN
    0;JMP

(END)



// go back to start
@0
0;JMP
