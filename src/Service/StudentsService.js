import { supabase } from "../Connect/dataconnect";

const StudentsService = {
    getStudents: async () => {
        const { data, error } = await supabase.from('students').select('*');
        if (error) {
            console.error("Error fetching students:", error);
            return [];
        }
        return data;
    },
    
    addStudent: async (student) => {
        const { data, error } = await supabase.from('students').insert([student]);
        if (error) {
            console.error("Error adding student:", error);
            return null;
        }
        return data;
    },
    deleteStudent: async (studentId) => {
        const { data, error } = await supabase.from('students').delete().eq('id', studentId);
        if (error) {
            console.error("Error deleting student:", error);
            return null;
        }
        return data;
    },
    updateStudent: async (studentId, updatedFields) => {
        const { data, error } = await supabase.from('students').update(updatedFields).eq('id', studentId);
        if (error) {
            console.error("Error updating student:", error);
            return null;
        }
        return data;
    },

    
};

export default StudentsService;