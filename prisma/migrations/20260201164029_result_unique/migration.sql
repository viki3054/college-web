/*
  Warnings:

  - A unique constraint covering the columns `[studentId,subjectId,term,examName]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_studentId_subjectId_term_examName_key" ON "Result"("studentId", "subjectId", "term", "examName");
