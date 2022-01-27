// set 256 to 20
@20
D=A
@256
M=D

// set 257 to 30
@30
D=A
@257
M=D

// set SP (0) to 258
@258
D=A
@0
M=D

// PROG lines start here
@SP // go to the pointer
A=M-1 // move up one since this points "below" where values are stored
D=M  // put var 1 in D  (TOP)
A=A-1 // move A so that M will be the next value up the stack (M=BOTTOM)
D=M-D // subtract the bottom value from the top value
@ISLT${index}  // set ISLT jump point
D;JLT // if D (the difference) is < 0, jump to ISLT
// @NOTLT
// 0;JMP
// (NOTLT) // -- can probably be removed
@SP
A=M
A=A-1
A=A-1
M=0
D=A+1
@SP
M=D
@ENDLT${index}
0;JMP
(ISLT${index})
@SP
A=M
A=A-1
A=A-1
M=-1
D=A+1
@SP
M=D
@ENDLT${index}
0;JMP
(ENDLT${index})
// M=-1  // ########### can't set because A is wrong place because of jump,
// D=A+1 // get the new SP value
// @SP // go to SP storage place
// M=D // set SP to one below where we left our value
// // SET D = 1
// (ENDLT)
// @ENDLT
// 0;JMP