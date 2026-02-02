import { supabase } from "../Connect/dataconnect";

const EnrollmentService = {
  // Получить всех студентов
  getStudents: async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (error) {
      console.error("Error fetching students:", error);
      return [];
    }
    return data;
  },

  // Получить все курсы
  getCourses: async () => {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
    return data;
  },

  // Получить все записи на курсы с данными студентов и курсов
  getCoursesAndStudents: async () => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        students (id, first_name, last_name),
        courses (id, title, start_time)
      `);
    if (error) {
      console.error("Error fetching enrollments:", error);
      return [];
    }
    return data;
  },

  // Добавить запись студента на курс
  addStudentToCourse: async (studentId, courseId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        course_id: courseId   // <-- убедись, что в таблице enrollments колонка называется course_id
      });
    return { data, error };
  }
};

export default EnrollmentService;
