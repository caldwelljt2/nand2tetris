(Main.vm)
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
A=M
A=A+1
M=D
@ARG
D=M
@SP
A=M
A=A+1
A=A+1
M=D
@THIS
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
M=D
@THAT
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
A=A+1
M=D
@SP
A=M
A=M-1
A
=
A
-
1
D=A
@ARG
M=D
@SP
A=M
A
=
A
+
1
D=A
@LCL
M=D
A=M
M
D=A
@SP
M=D
@0
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
A=A-1
D=M-D
@IS.Main.vm.8
D;JLT
@SP
A=M
A=A-1
A=A-1
M=0
D=A+1
@SP
M=D
@END.Main.vm.8
0;JMP
(IS.Main.vm.8)
@SP
A=M
A=A-1
A=A-1
M=-1
D=A+1
@SP
M=D
@END.Main.vm.8
0;JMP
(END.Main.vm.8)
@SP
A=M-1
D=M
@IF_TRUE
D;JMP
@IF_FALSE
0;JMP
(IF_TRUE)
@0
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@SP
A=M
A=A-1
D=A
@ARG
A=M
M=A
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
A=A-1
D=M
@ARG
A=M
A=A+1
M=D
D=A
@SP
M=D
@LCL
A=M
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
D=M
M=0
@THAT
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
D=A
@R13
M=D
A=D
D=M
M=0
@LCL
M=D
(CLEARARGS.Main.vm.9)
@R13
D=M
A=M
M=0
@SP
D=D-M
@CLEARARGS.Main.vm.9
D;JLE
@SP
D=M
M=0
A=D
0;JMP
(IF_FALSE)
@0
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
A=A-1
M=M-D
D=A+1
@SP
M=D
NOT
TESTED
(Main.fibonacciRETURN)
@Main.fibonacci
0;JMP
@0
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@1
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
A=A-1
M=M-D
D=A+1
@SP
M=D
NOT
TESTED
(Main.fibonacciRETURN)
@Main.fibonacci
0;JMP
@SP
A=M-1
D=M
A=A-1
M=M+D
D=A+1
@SP
M=D
@SP
A=M
A=A-1
D=A
@ARG
A=M
M=A
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
A=A-1
D=M
@ARG
A=M
A=A+1
M=D
D=A
@SP
M=D
@LCL
A=M
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
D=M
M=0
@THAT
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
D=A
@R13
M=D
A=D
D=M
M=0
@LCL
M=D
(CLEARARGS.Main.vm.10)
@R13
D=M
A=M
M=0
@SP
D=D-M
@CLEARARGS.Main.vm.10
D;JLE
@SP
D=M
M=0
A=D
0;JMP
(SimpleFunction.vm)
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
A=M
A=A+1
M=D
@ARG
D=M
@SP
A=M
A=A+1
A=A+1
M=D
@THIS
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
M=D
@THAT
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
A=A+1
M=D
@SP
A=M
A=M-1
A
=
A
-
1
D=A
@ARG
M=D
@SP
A=M
A=A+1
D=A
@LCL
M=D
A=M
// M
D=A
@SP
M=D
@0
D=A
@LCL
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@1
D=A
@LCL
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@SP
A=M-1
D=M
A=A-1
M=M+D
D=A+1
@SP
M=D
@SP
A=M-1
D=M
A=A
M=!D
D=A+1
@SP
M=D
@0
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@SP
A=M-1
D=M
A=A-1
M=M+D
D=A+1
@SP
M=D
@1
D=A
@ARG
D=D+M
A=D
D=M
@SP
M=M+1
A=M-1
M=D
@SP
A=M-1
D=M
A=A-1
M=M-D
D=A+1
@SP
M=D
@SP
A=M
A=A-1
D=A
@ARG
A=M
M=A
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
A=A-1
D=M
@ARG
A=M
A=A+1
M=D
D=A
@SP
M=D
@LCL
A=M
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
D=M
M=0
@THAT
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
D=M
M=0
@THIS
M=D
@LCL
A=M
A=A-1
A=A-1
A=A-1
A=A-1
D=A
@R13
M=D
A=D
D=M
M=0
@LCL
M=D
(CLEARARGS.SimpleFunction.vm.11)
@R13
D=M
A=M
M=0
@SP
D=D-M
@CLEARARGS.SimpleFunction.vm.11
D;JLE
@SP
D=M
M=0
A=D
0;JMP
(Sys.vm)
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
A=M
A=A+1
M=D
@ARG
D=M
@SP
A=M
A=A+1
A=A+1
M=D
@THIS
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
M=D
@THAT
D=M
@SP
A=M
A=A+1
A=A+1
A=A+1
A=A+1
M=D
@SP
A=M
A=M-1
A=A-1
D=A
@ARG
M=D
@SP
A=M
A=A+1
D=A
@LCL
M=D
A=M
M
D=A
@SP
M=D
@4
D=A
@SP
A=M
M=D
@SP
M=M+1
(Main.fibonacciRETURN)
@Main.fibonacci
0;JMP
(WHILE)
@WHILE
0;JMP
(ENDLOOP)
@ENDLOOP
0;JMP
