# nand2tetris.org Part 1 Course Files and Answers

## My Thoughts/Implementation

I decided to take this course in an effort to fully understand the structure of
computing. While my career focused on a combination of abstractions, I have always
wished I could trace either the activities I was performing or the applications I
am constructing down to at least some physical implementation level. While I have no
doubt modern computing is more complex than the basic hack CPU I contstructed here, I
can say with some confidence, I at least _understand_ it. I now also understand, in a way
I never fully grasped before, why programming in assembly is so difficult and time consuming.

For anyone else in related computing fields reading this this. I cannot recommend it high enough.
Unless your one of the few that either built your own processor as part of a CS degree or
more importantly, truely grasps hardware i/o up front, then I would give this project a try.
Even if you do not complete the entire project, the first half (Untits 1 to 6) will help in
ways I cannot fully articulate right now.

        -Jonathan Caldwell
        
        p.s. Sorry for any messy code, I hadn't originally intended to upload this for public
        consumption and frequently left test lines, comments, etc, inline so that I could
        reference them as I moved forward.
        
        100% of this code is mine, and roughly 95% of it was written without looking at anyone
        else's code. (The most notable exceptions would be properly wiring the ALU to the registers
        inside the CPU during the last project (Project 6). I found reviewing other people's code,
        even though it was written in a different language, far more useful than the built in test
        output. For instance, it wasn't readily apparent what defualts to use in the event symbolic
        code 'left out' default/optional components (i.e. destination or Jump).

## Course Details

The Nand to Tetris course takes you on a self-paced fascinating voyage of
discovery in which you will go all the way from Boolean algebra and elementary
logic gates to building a Central Processing Unit, a memory system, and a
hardware platform, leading up to a general-purpose computer that can run any
program that you fancy. In the process of building this computer you will
become familiar with many important hardware abstractions, and you will
implement them, hands on. But most of all, you will enjoy the tremendous thrill
of building a complex and useful system from the ground up.

The course homework consists of a series 6 projects:

### Project 1
Building elementary logic gates like And, Or, Not, Multiplexor, and
more, given only the Nand gate as a starting point. Run your Hardware
Description Language (.hdl) files against the .tst (test) output files of known
working chips to prove your chip implements the desired chip functionality
correctly.

### Project 2
Building a family of adder chips, culminating in the construction of
an Arithmetic Logic Unit (ALU)

### Project 3
Building registers and memory units, culminating in the construction
of a Random Access Memory (RAM)

### Project 4
Learning a machine language and using it to write some illustrative
low-level programs

### Project 5
Using the chipset built in projects 1-3 to build a Central
Processing Unit (CPU) and a hardware platform capable of executing programs
written in the machine language introduced in project 4

### Project 6
Developing an assembler, i.e., a capability to translate programs
written in symbolic machine language into binary, executable code.

## How to setup manually
Clone the repo.
Unzip the nan2tetris.zip file.
Make sure you have Java Development Kit installed (OpenJDK on \*nix).
Make the shell scripts inside nand2tetris/tools executable.
Run whatever tool you want.

## Copy-paste install for BASH shell on Debian/Ubuntu-based
```
$ sudo apt-get install -y openjdk
$ cd ~/Desktop
$ git clone https://github.com/saltycraig/nand2tetris.git
$ cd nand2tetris && unzip nand2tetris.zip
$ cd nand2tetris/tools && chmod +x *.sh
$ ./HardwareSimulator.sh
```
