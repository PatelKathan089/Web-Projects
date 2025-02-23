const API_URL = 'http://192.168.1.8:3000/';
const API_KEY = 'mysecureapikey123';

// Retriving the data from the server:-
export const getPasswords = async (setpasswordArray) => {
    try {
        let req = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
        });

        let passwords = await req.json();
        setpasswordArray(passwords);

    } catch (err) {
        console.error('Get password error: ', err);
    }
}

// Save or Update the Password:-
export const savePassword = async (data, setpasswordArray, setIsEditing, reset, toast) => {
    const method = data.id ? 'PUT' : 'POST';

    try {
        await fetch(API_URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        getPasswords(setpasswordArray); // Refresh Password List.

        toast.success(data.id ? 'Password Updated!' : 'Password Saved!', {
            position: 'top-right',
            closeOnClick: true,
            autoClose: 2000
        });

        setIsEditing(false);
        reset(); // Clear Form fields.

    } catch (err) {
        console.error('Error saving/update password: ', err);
    }
}

// Edit Password:-
export const editPassword = (id, passwordArray, setIsEditing, setValue, toast) => {
    const passwordToEdit = passwordArray.find((item) => item._id === id);

    if (!passwordToEdit) {
        toast.error("Error: Password not found!");
        return;
    }
    // Populate the form fields with existing data:-
    setValue("site", passwordToEdit.site);
    setValue("username", passwordToEdit.username);
    setValue("password", passwordToEdit.password);
    setValue("id", passwordToEdit._id);

    setIsEditing(true);
};

// Delete Password:-
export const deletePassword = async (id, setpasswordArray, toast) => {

    try {
        setpasswordArray((prevState) => prevState.filter((item) => item.id !== id));

        await fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id.toString() }),
        });

        getPasswords(setpasswordArray)

        toast.success('Password Deleted!', {
            position: 'top-right',
            autoClose: 2000,
            closeOnClick: true
        });

    } catch (err) {
        console.error('Error deleting password: ', err);
    }
}

// Copy Text (password,site,username):-
export const copyText = (text, toast) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
    });
};
