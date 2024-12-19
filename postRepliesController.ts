import { Controller } from "./controller";
import { PostReply } from "../models/postReplies";
import { User } from "../models/User";

// PostReplyController: beheert logica voor plaatsen van reacties
export class PostReplyController extends Controller {
    public constructor(view: HTMLElement) {
        super(view); // container doorgeven
    }

    // render: setup interactie om reply te posten
    protected async render(): Promise<void> {
        const postButton: HTMLButtonElement | null = this.view.querySelector<HTMLButtonElement>("#post-reply-button");
        const contentInput: HTMLTextAreaElement | null = this.view.querySelector<HTMLTextAreaElement>("#content");

        // check of velden bestaan
        if (!postButton || !contentInput) {
            console.error("Sommige elementen ontbreken in de DOM.");
            return;
        }

        const username: string = localStorage.getItem("username") || "defaultUsername";
        const vraagId: string | null = localStorage.getItem("vraagId");

        if (!vraagId) {
            console.error("Geen vraagId gevonden in localStorage.");
            return;
        }

        const userId: string | null = localStorage.getItem("userId");
        if (!userId) {
            alert("Je moet ingelogd zijn om een reactie te plaatsen.");
            return;
        }

        const parsedUserId: number = parseInt(userId, 10);
        if (isNaN(parsedUserId)) {
            alert("Ongeldig gebruiker-ID. Probeer opnieuw in te loggen.");
            console.error("Ongeldig gebruiker-ID opgeslagen in localStorage.");
            return;
        }

        // check of user ingelogd is
        const isLoggedIn: boolean = await User.isLoggedIn(parsedUserId);
        if (!isLoggedIn) {
            alert("Je moet ingelogd zijn om een reactie te plaatsen.");
            return;
        }

        // klik event om reply te posten
        postButton.addEventListener("click", async (): Promise<void> => {
            const content: string = contentInput.value.trim();
            if (!content) {
                alert("Alle velden zijn verplicht.");
                return;
            }

            try {
                // fix: geef altijd een string mee
                const newReply: PostReply | undefined = await PostReply.post(vraagId, content, username);

                if (newReply) {
                    alert("Reply succesvol geplaatst!");
                    contentInput.value = ""; // input resetten
                }
                else {
                    alert("Het plaatsen van de reply is mislukt.");
                }
            }
            catch (error: unknown) {
                alert("Er is een fout opgetreden bij het plaatsen van de reply.");
                console.error("Fout:", error instanceof Error ? error.message : error);
            }
        });
    }
}
