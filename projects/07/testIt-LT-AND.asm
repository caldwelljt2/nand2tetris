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

// 11 lines to here
@32767 // grav value for | later
D=A // save into D
@SP // go to the pointer
A=M // move up one since this points "below" where values are stored
M=D // drop | from above 32767 
A=A-1 // move down one
D=M // put var 1 in D  (TOP)
A=A-1 // move A so that M will be the next value up the stack (M=BOTTOM)
M=M-D //subtract the bottom value from the top value, save in M
D=M // copy to D
A=A+1 // move pointer down
M=D // save again in M
A=A+1 // move pointer down
D=D|M // if negative this should be -1 (1xxxxxxxxxxxxxx), if not it should be positive(0xxxxxxxxxxxxxxx)
D=!D
M=!M
D=D|M
D=!D






















// D=!D
// M=!M
// D=D&M
// D=!D
// A=A-1
// A=A-1
// M=D
