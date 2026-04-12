const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5272").replace(/\/+$/, "");

type ProblemDetails = {
  title?: string;
  detail?: string;
  status?: number;
  errors?: Record<string, string[]>;
};

export type AuthApiUser = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  coverImageUrl: string | null;
  authProvider: string;
  createdAtUtc: string;
  lastLoginAtUtc: string | null;
  isActive: boolean;
};

export type AuthApiResponse = {
  accessToken: string;
  accessTokenExpiresAtUtc: string;
  refreshToken: string;
  refreshTokenExpiresAtUtc: string;
  user: AuthApiUser;
};

type JsonBody = Record<string, unknown> | undefined;

export class AuthApiError extends Error {
  status: number;
  detail: string | null;
  validationErrors: string[];

  constructor(status: number, problemDetails: ProblemDetails | null) {
    super(problemDetails?.detail ?? problemDetails?.title ?? "Request failed.");

    this.name = "AuthApiError";
    this.status = status;
    this.detail = problemDetails?.detail ?? null;
    this.validationErrors = flattenValidationErrors(problemDetails?.errors);
  }
}

export async function registerAuth(input: {
  email: string;
  password: string;
  displayName: string;
}): Promise<AuthApiResponse> {
  return request<AuthApiResponse>("/api/auth/register", {
    method: "POST",
    body: input
  });
}

export async function loginAuth(input: {
  email: string;
  password: string;
}): Promise<AuthApiResponse> {
  return request<AuthApiResponse>("/api/auth/login", {
    method: "POST",
    body: input
  });
}

export async function refreshAuth(input: { refreshToken: string }): Promise<AuthApiResponse> {
  return request<AuthApiResponse>("/api/auth/refresh", {
    method: "POST",
    body: input
  });
}

export async function logoutAuth(input: { refreshToken: string }): Promise<void> {
  await request<void>("/api/auth/logout", {
    method: "POST",
    body: input
  });
}

export async function getCurrentUser(accessToken: string): Promise<AuthApiUser> {
  return request<AuthApiUser>("/api/users/me", {
    method: "GET",
    accessToken
  });
}

export async function updateCurrentUserProfile(input: {
  accessToken: string;
  displayName: string;
  avatarFile: File | null;
  removeAvatar: boolean;
  coverFile: File | null;
  removeCover: boolean;
}): Promise<AuthApiUser> {
  const formData = new FormData();
  formData.set("displayName", input.displayName);

  if (input.avatarFile) {
    formData.set("avatar", input.avatarFile);
  }

  if (input.removeAvatar) {
    formData.set("removeAvatar", "true");
  }

  if (input.coverFile) {
    formData.set("cover", input.coverFile);
  }

  if (input.removeCover) {
    formData.set("removeCover", "true");
  }

  return request<AuthApiUser>("/api/users/me", {
    method: "PUT",
    accessToken: input.accessToken,
    body: formData
  });
}

export function resolveApiUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function request<T>(
  path: string,
  options: {
    method: "GET" | "POST" | "PUT";
    body?: JsonBody | FormData;
    accessToken?: string;
  }
): Promise<T> {
  let response: Response;
  const isFormData = options.body instanceof FormData;
  let requestBody: BodyInit | undefined;

  if (options.body instanceof FormData) {
    requestBody = options.body;
  } else if (options.body) {
    requestBody = JSON.stringify(options.body);
  }

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: options.method,
      headers: {
        ...(options.body && !isFormData ? { "Content-Type": "application/json" } : {}),
        ...(options.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {})
      },
      body: requestBody
    });
  } catch (error) {
    throw new Error("Network request failed.", { cause: error });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await readJson(response);

  if (!response.ok) {
    throw new AuthApiError(response.status, payload);
  }

  return payload as T;
}

async function readJson(response: Response): Promise<ProblemDetails | Record<string, unknown> | null> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json") && !contentType.includes("application/problem+json")) {
    return null;
  }

  return (await response.json()) as ProblemDetails | Record<string, unknown>;
}

function flattenValidationErrors(errors: ProblemDetails["errors"]): string[] {
  if (!errors) {
    return [];
  }

  return Object.values(errors).flat().filter(Boolean);
}
