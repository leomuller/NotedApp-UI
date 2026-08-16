export interface NoteInfo {
	noteId: number;
	loginId: number;
	noteTitle: string;
	noteText: string;
	isPinned: boolean;
	isDeleted: boolean;
	dateCreated: string;
	dateUpdated: string;
	dateDeleted: string | null;
}

export interface NoteCreate {
	noteTitle: string;
	noteText: string;
}

export interface NoteUpdate {
	noteTitle: string;
	noteText: string;
	isPinned: boolean;
}

