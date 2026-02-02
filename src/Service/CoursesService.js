import { supabase } from "../Connect/dataconnect";

const CoursesService = {
    getCourses: async () => {
        const { data, error } = await supabase.from('courses').select('*');
        if (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
        return data;
    },

    addCourse: async (course) => {
        const { data, error } = await supabase.from('courses').insert([course]);
        if (error) {
            console.error("Error adding course:", error);
            return null;
        }
        return data;
    },

    deleteCourse: async (courseId) => {
        const { data, error } = await supabase.from('courses').delete().eq('id', courseId);
        if (error) {
            console.error("Error deleting course:", error);
            return null;
        }
        return data;
    },

    updateCourse: async (courseId, updatedFields) => {
        const { data, error } = await supabase.from('courses').update(updatedFields).eq('id', courseId);
        if (error) {
            console.error("Error updating course:", error);
            return null;
        }
        return data;
    },
};

export default CoursesService;
