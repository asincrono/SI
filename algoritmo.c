#include <stdio.h>

int main() {
   char source[1000];
   int var[30];
   int varPrev[30]
   int * sen;

   int program[100][10];
   int goAgain = 1;
   int i = 0;

   var[0] = 1;

   // Parser.
   int readed = read(0, source, 1000);
   //a :- .
   sen = program[0];
   sen [0] = 1;

   //b:- a.
   sen = program[1];
   sen [0] = 2;
   sen [1] = 1;

   //c :- b.
   sen = program[2];
   sen[0] = 3;
   sen[1] = 2;

   sen = program[3];
   sen[0] = 0; // fin de sentencias/programas.

   // Algortimo.
   while (goAgain) {
      for (i = 0; i < 30; i +=1) {
         varPrev[i] = var[i];
      }

      // Programa y ejecución
      i = 0;
      sen = program[i];
      while (sen[0] != 0) {
         int j = 1;
         var[sen[0]] = 1; // Si no ya la haré cero.
         while (var[sen[j]] != 0) {
            if (var[sen[j] == 0) {
               var[sen[0]] = 0;
               break;
            }
            j += 0;
         }

         // antes
         if (var[sen[1]] == 1) {
            var[sen[0]] = 1;
         }
         i += 1;
         sen = program[i];
      }
      goAgain = 0;
      for (i = 0; i < 30; i += 1) {
         if (var[i] != varPrev[i]) {
            goAgain = 1;
            break;
         }
      }
      printf("a = %i, b = %i, c = i", var[0], var[1], var[2]);
   }
}
