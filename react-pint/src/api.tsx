export interface FormState {
    username: string;
    email: string;
    password: string;
    date?: string;
}

export interface LoginResponse {
    username: string;
    email: string;
    token: string;
}

export const yourLoginFunction = async (
    formData: FormState
): Promise<LoginResponse | boolean> => {
    try {
        const response = await fetch("http://localhost:3001/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        const user = users.find(
            (u: { email: string; password: string; token: string }) =>
                u.email === formData.email && u.password === formData.password
        );

        if (!user) {
            return false;
        }

        localStorage.setItem("token", user.token);

        return {
            username: user.username,
            email: user.email,
            token: user.token,
        };
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

export const yourRegisterFunction = async (
    formData: FormState
): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                token: "new-fake-jwt-token",
            }),
        });

        if (!response.ok) {
            throw new Error("Ошибка регистрации");
        }

        const data = await response.json();
        console.log("Ответ сервера:", data);

        return true;
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        return false;
    }
};

export const uploadFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const mockUrl = `http://localhost:3001/uploads/${file.name}`;
        setTimeout(() => {
            resolve(mockUrl);
        }, 1000);
    });
};
