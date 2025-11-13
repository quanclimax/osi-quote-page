export interface QuoteFileInfo {
  file_name: string;
  file_url: string;
}

export interface QuoteApiData {
  quote_code: string; // e.g. "QT-2025-001"
  quote_date: string; // ISO string
  valid_until: string; // ISO string
  customer_name: string;
  contact_name: string;
  personal_email: string;
  company_email: string;
  description: string;
  sale_note?: string;
  quote_file: QuoteFileInfo;
  record_id: string;
  status?: string;
}

export interface QuoteApiResponse {
  status: string;
  message: string;
  data: QuoteApiData;
}

const DEFAULT_API_BASE = "https://automation.osi.vn";

export async function fetchQuoteById(recordId: string, apiBase: string = DEFAULT_API_BASE): Promise<QuoteApiData> {
  const url = `${apiBase}/webhook/quote`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: recordId }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = (await response.json()) as QuoteApiResponse | QuoteApiResponse[];

  // Some webhooks may wrap in an array; normalize to object
  const payload = Array.isArray(json) ? json[0] : json;
  if (!payload || payload.status !== "success") {
    throw new Error(payload?.message || "Không thể lấy dữ liệu báo giá");
  }

  return payload.data;
}

export interface AcceptQuoteResponse {
  status: string;
  message: string;
}

export async function acceptQuote(recordId: string, apiBase: string = DEFAULT_API_BASE): Promise<AcceptQuoteResponse> {
  const url = `${apiBase}/webhook/accept-quote`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "quote-record-id": recordId }),
  });
  if (!response.ok) throw new Error(`Accept failed ${response.status}`);
  return (await response.json()) as AcceptQuoteResponse;
}

export interface RequestAdjustResponse {
  status: string;
  message: string;
}

export async function requestAdjust(recordId: string, content: string, apiBase: string = DEFAULT_API_BASE): Promise<RequestAdjustResponse> {
  const url = `${apiBase}/webhook/request-to-adjust`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "quote-record-id": recordId, content }),
  });
  if (!response.ok) throw new Error(`Request adjust failed ${response.status}`);
  return (await response.json()) as RequestAdjustResponse;
}


