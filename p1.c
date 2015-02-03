#include <stdio.h>
#include <string.h>
int main () {
    int var[30];
    int varPrev[30];
    int goAgain = 1;

    // ./p4 < program.txt
    char program[1000];
    read(0, program, 1000);

    // strtok(program, ':');

    for (int i = 0; i < 30; i += 1) {
        var[i] = 0;
        varPrev[i] = 0;
    }
    do {
        // B :- A.
        if (var[1] == 1) var[2] = 1;
        // C :- B.
        if (var[2] == 1) var[3] = 1;
        // a :-.
        var[1] = 1;

        goAgain = 0;
        for (int i = 0; i < 30; i += 1) {
            if (var[i] != varPrev[i]) {
                goAgain = 1;
                break;
            }
        }

        for (int i = 0; i < 30; i += 1) {
            varPrev[i] = var[i];
        }

        printf ("a = %u, b = %u, c = %u.\n", var[1], var[2], var[3]);
    } while (goAgain);
}
