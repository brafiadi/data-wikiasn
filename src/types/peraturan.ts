export interface Peraturan {
	id: number;
	nama: string;
	tautan: string;
	tahun: string;
	berlaku: boolean;
	kata_kunci: string[];
	slug: string;
	kategori: string;
	tanggal_pengesahan: Date;
}

export interface InsertPeraturanData {
	nama: string;
	tautan: string;
	tahun: string;
	berlaku?: boolean;
	kata_kunci: string[];
	slug: string;
	kategori: string;
	tanggal_pengesahan: Date;
}

export interface UpdatePeraturanData {
	nama?: string;
	tautan?: string;
	tahun?: string;
	berlaku?: boolean;
	kata_kunci: string[];
	slug?: string;
	kategori?: string;
	tanggal_pengesahan?: Date;
}
