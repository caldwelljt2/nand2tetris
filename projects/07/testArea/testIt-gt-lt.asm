@SP // go to the pointer
A=M-1 // move up one since this points "below" where values are stored
D=M  // put var 1 in D  (TOP)
A=A-1 // move A so that M will be the next value up the stack (M=BOTTOM)
D=M-D // subtract the bottom value from the top value
@ISLT  // set ISLT jump point
D;JLT // if D (the difference) is < 0, jump to ISLT
@NOTLT
0;JMP
(NOTLT) // -- can probably be removed
M=0 // 0 is No, not greater than - leave here on stack
D=A+1 // get the new SP value
@SP // go to SP storage place
M=D // set SP to one below where we left our value
@ENDGT // send end LT end point
0;JMP  // jump there assuming we are not greater than
(ISLT)
M=-1  // ########### can't set because A is wrong place because of jump,
D=A+1 // get the new SP value
@SP // go to SP storage place
M=D // set SP to one below where we left our value
// SET D = 1
(ENDLT)
@ENDLT
0;JMP
// @0
// D=M
// // D=A
// @2
// M;JLE
// // @SP
// M=D


// // retreive the contents of SP area (pop)
// // @SP
// // A=M
// // D=M
// // // @SP
// // // M=M+1

// // push constant 4444
// // get a constant
// @9
// D=A

// // fetch SP address
// @SP
// A=M // goes to address

// // sets value at that address to D register's value
// M=D

// //increment pointer
// @SP
// M=M+1


// // example for pushing constant
// @7 // <--- this line will change
// D=A
// @SP
// A=M
// M=D
// @SP
// M=M+1

// // assuming 2 on stack already (SP=>258)
// // sub (doesn't require a var)
// @SP // go to the pointer
// A=M-1 // move up one since this points "below" where values are stored
// D=M  // put var 1 in D
// A=A-1 // move A so that M will be the next value up the stack
// M=M-D // subtract the value in the top/higher position from the lower one stored in D <--- this line will change
// D=A+1 // get the new SP value
// @SP // go to SP storage place
// M=D // set SP to one below where we left our value


// // push constant and all single word operands (add, sub, neg, eq, gt,lt,and,or,not) change <-- Above

// // handle pop
// // pop constant = error
// // pop local = goto pointer/ get value - 1 below, store in D, goto

// // handle push
// // goto value (use table or array for local/static/etc?) first, set D val
// // goto pointer, push via @sp, A=M, M=D, (don't forget to fix pointer), like above? D=A+1, @SP, M=D

// // handle pointer ???