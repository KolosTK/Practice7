import { UniversityManagementSystem } from "./Services/UniversityManagementSystem";
import { Faculty } from "./enums/Faculty";
import { StudentStatus } from "./enums/StudentStatus";

// Instantiate the management system
const ums = new UniversityManagementSystem();

// Enroll a new student
const newStudent = ums.enrollStudent({
  fullName: "Jane Doe",
  faculty: Faculty.Computer_Science, // Ensure this matches your enum values
  year: 1, // Specify the student's year of study
  status: StudentStatus.Active,
  enrollmentDate: new Date("2023-09-01"),
  groupNumber: "CS101", // Provide a valid group number
});

console.log("Enrolled student:", newStudent);