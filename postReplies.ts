import "../hicConfig";
import { api } from "@hboictcloud/api";

// Deze klasse vertegenwoordigt een reactie op een vraag.
export class PostReply {
    private _id: number; // ID van de reactie
    private _vraagId: string; // ID van de vraag waaraan de reactie is gekoppeld
    private _content: string; // Inhoud van de reactie
    private _auteur: string; // Auteur van de reactie
    private _createdAt: string; // Timestamp van wanneer de reactie is aangemaakt

    /**
     * Constructor voor het aanmaken van een nieuwe reactie
     * @param id - ID van de reactie
     * @param vraagId - ID van de vraag waaraan de reactie is gekoppeld
     * @param content - Inhoud van de reactie
     * @param auteur - Auteur van de reactie
     * @param createdAt - Timestamp van wanneer de reactie is aangemaakt
     */
    public constructor(id: number, vraagId: string, content: string, auteur: string, createdAt: string) {
        this._id = id;
        this._vraagId = vraagId;
        this._content = content;
        this._auteur = auteur;
        this._createdAt = createdAt;
    }

    /**
     * Voegt een nieuwe reactie toe aan de database
     * @param vraagId - ID van de vraag waaraan de reactie is gekoppeld
     * @param content - Inhoud van de reactie
     * @param auteur - Auteur van de reactie
     * @returns Een nieuwe PostReply instantie of undefined als het toevoegen mislukt
     */
    public static async post(vraagId: string, content: string, auteur: string): Promise<PostReply | undefined> {
        try {
            // Controleer of inhoud en auteur niet leeg zijn
            if (!content.trim()) {
                console.warn("Inhoud en auteur mogen niet leeg zijn.");
                return undefined;
            }

            // SQL-query voor het invoegen van de reactie
            const query: string = `
    INSERT INTO replies (auteur, content, vraag_id, created_at)
    VALUES ('${auteur}', '${content.replace(/'/g, "\\'")}', '${vraagId}', NOW())
`;

            // Voer de query uit
            const result: { affectedRows: number; insertId: number } = await api.queryDatabase(query) as {
                affectedRows: number;
                insertId: number;
            };

            // Controleer of de reactie succesvol is toegevoegd
            if (result.affectedRows > 0) {
                return new PostReply(
                    result.insertId,
                    vraagId,
                    content,
                    auteur,
                    new Date().toISOString() // Gebruik de huidige tijd voor created_at
                );
            }
            else {
                alert("Het toevoegen van de reactie is mislukt.");
                return undefined;
            }
        }
        catch (error) {
            // Log een fout als de query mislukt
            alert("Fout bij het toevoegen van de reactie:");
            throw error; // Gooi de fout opnieuw voor hogere-afhandelingslogica
        }
    }

    // Getter voor de ID van de reactie
    public get id(): number {
        return this._id;
    }

    // Getter voor de ID van de vraag
    public get vraagId(): string {
        return this._vraagId;
    }

    // Getter voor de inhoud van de reactie
    public get content(): string {
        return this._content;
    }

    // Getter voor de auteur van de reactie
    public get auteur(): string {
        return this._auteur;
    }

    // Getter voor de aanmaakdatum van de reactie
    public get createdAt(): string {
        return this._createdAt;
    }
}
