import { Student } from "../interfaces/Student";
import { Course } from "../interfaces/Course";
import { Grade } from "../interfaces/Grade";
import { StudentStatus } from "../enums/StudentStatus";
import { Faculty } from "../enums/Faculty";
import { Semester } from "../enums/Semester";
import { Mark } from "../enums/Mark";

export class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: Grade[] = [];

  // Реєстрація студента
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent = { ...student, id: this.students.length + 1 };
    this.students.push(newStudent);
    return newStudent;
  }

  // Реєстрація студента на курс
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student) {
      throw new Error("Student not found.");
    }
    if (!course) {
      throw new Error("Course not found.");
    }
    if (course.faculty !== student.faculty) {
      throw new Error("Student cannot register for a course in a different faculty.");
    }
    const registeredStudents = this.grades.filter((g) => g.courseId === courseId).length;
    if (registeredStudents >= course.maxStudents) {
      throw new Error("Course is full.");
    }
  }

  // Виставлення оцінки студенту
  setGrade(studentId: number, courseId: number, grade: Mark): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student) {
      throw new Error("Student not found.");
    }
    if (!course) {
      throw new Error("Course not found.");
    }
    const isRegistered = this.grades.some(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (!isRegistered) {
      throw new Error("Student is not registered for the course.");
    }

    this.grades.push({
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester,
    });
  }

  // Оновлення статусу студента
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);

    if (!student) {
      throw new Error("Student not found.");
    }
    if (
      student.status === StudentStatus.Graduated ||
      student.status === StudentStatus.Expelled
    ) {
      throw new Error("Cannot update status of graduated or expelled students.");
    }
    if (!Object.values(StudentStatus).includes(newStatus)) {
      throw new Error("Invalid student status.");
    }

    student.status = newStatus;
  }

  // Отримання студентів за факультетом
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  // Отримання оцінок студента
  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  // Доступні курси за факультетом і семестром
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
  }

  // Обчислення середнього балу студента
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);

    if (studentGrades.length === 0) {
      return 0;
    }

    const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
    return total / studentGrades.length;
  }

  // Отримання списку відмінників по факультету
  getTopStudentsByFaculty(faculty: Faculty): Student[] {
    const studentsByFaculty = this.getStudentsByFaculty(faculty);
    return studentsByFaculty.filter((student) => {
      const averageGrade = this.calculateAverageGrade(student.id);
      return averageGrade >= Mark.Excellent;
    });
  }
}
