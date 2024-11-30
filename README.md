# University Management System

Цей проект реалізує систему управління навчальним процесом університету за допомогою TypeScript і перерахувань (Enum).

## Мета

Завдання полягає в освоєнні TypeScript через створення системи для управління студентами, курсами та оцінками у університеті.

## Основні Enum

- **StudentStatus**: Active, Academic_Leave, Graduated, Expelled.
- **CourseType**: Mandatory, Optional, Special.
- **Semester**: First, Second.
- **Grade**: Excellent, Good, Satisfactory, Unsatisfactory.
- **Faculty**: Computer_Science, Economics, Law, Engineering.

## Інтерфейси

- **Student**: Студент (id, ім’я, факультет, рік, статус, група).
- **Course**: Курс (id, назва, тип, кредити, семестр, факультет).
- **Grade**: Оцінка студента (studentId, courseId, grade, дата, семестр).

## Клас `UniversityManagementSystem`

Методи для управління:

1. **enrollStudent**: Реєстрація студента.
2. **registerForCourse**: Реєстрація на курс.
3. **setGrade**: Виставлення оцінки.
4. **updateStudentStatus**: Оновлення статусу студента.
5. **getStudentsByFaculty**: Студенти за факультетом.
6. **getStudentGrades**: Оцінки студента.
7. **getAvailableCourses**: Доступні курси.
8. **calculateAverageGrade**: Середній бал студента.

## Перевірки та Валідації

- Перевірка реєстрації на курс (макс. студенти, факультет).
- Валідація статусу студента.
- Перевірка при виставленні оцінки (зареєстрований на курс).
- Список відмінників по факультету.

## Як запустити

1. Встановіть Node.js та TypeScript.
2. Використовуйте команду:
   ```bash
   tsc index.ts
