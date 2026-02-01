import { supabase } from "../Connect/dataconnect";

const EnrollmentService = {
    getStudents: async () => {
        const { data, error } = await supabase.from('students').select('*');
        if (error) {
            console.error("Error fetching students:", error);
            return [];
        }
        return data;
    },

    getCourses: async () => {
        const { data, error } = await supabase.from('courses').select('*');
        if (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
        return data;
    }
}

export default EnrollmentService;