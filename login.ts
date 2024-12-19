import { LoginController } from "../controllers/loginController";
import { RegisterController } from "../controllers/registerController";
import { NavbarController } from "../controllers/navbarcontroller";
import { ShowQuestionController } from "../controllers/showquestioncontroller";
import { RecentQuestionsController } from "../controllers/recentquestioncontroller";
import { QuestionDetailController } from "../controllers/questiondetailcontroller";
import { PostQuestionController } from "../controllers/postquestioncontroller";
import { PostReplyController } from "../controllers/postRepliesController";

function app(): void {
    document.addEventListener("DOMContentLoaded", () => {
        // Initialize NavbarController
        new NavbarController(".nav-links");

        // DOM elements
        const loginContainer: HTMLElement | null = document.querySelector(".login-container");
        const registerContainer: HTMLElement | null = document.querySelector(".register-container");
        const questionContainer: HTMLElement | null = document.querySelector(".question-container");
        const recentQuestionsContainer: HTMLElement | null = document.querySelector(".recent-questions-container");
        const questionDetailContainer: HTMLElement | null = document.querySelector(".vraag-detail-container");
        const postQuestionContainer: HTMLElement | null = document.querySelector(".post-question-container");
        const postReplyContainer: HTMLElement | null = document.querySelector(".post-reply-container");

        if (loginContainer) {
            console.log("LoginController wordt geïnitialiseerd...");
            new LoginController(loginContainer);
        }

        if (registerContainer) {
            console.log("RegisterController wordt geïnitialiseerd...");
            new RegisterController(registerContainer);
        }

        if (questionContainer) {
            console.log("ShowQuestionController wordt geïnitialiseerd...");
            new ShowQuestionController(questionContainer);
        }

        if (recentQuestionsContainer) {
            console.log("RecentQuestionsController wordt geïnitialiseerd...");
            new RecentQuestionsController(recentQuestionsContainer);
        }

        if (questionDetailContainer) {
            console.log("QuestionDetailController wordt geïnitialiseerd...");
            new QuestionDetailController(questionDetailContainer);
        }

        if (postQuestionContainer) {
            console.log("PostQuestionController wordt geïnitialiseerd...");
            new PostQuestionController(postQuestionContainer);
        }

        if (postReplyContainer) {
            console.log("PostReplyController wordt geïnitialiseerd...");
            new PostReplyController(postReplyContainer); // Corrected this line
        }

        // Log if no matching container was found
        if (
            !loginContainer &&
            !registerContainer &&
            !questionContainer &&
            !recentQuestionsContainer &&
            !questionDetailContainer &&
            !postQuestionContainer &&
            !postReplyContainer
        ) {
            console.error(
                "Geen overeenkomstige container gevonden voor Login, Register, Questions, Recent Questions, Vraag Details of Vraag/Reply Plaatsen."
            );
        }
    });
}

app();
