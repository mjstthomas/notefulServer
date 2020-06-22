create table folders (
    id text primary key not null,
    folder_name text not null
);

create table notes (
    id serial not null,
    note_name text not null,
    folderId text references folders(id) on delete cascade not null,
    modified  date default now(),
    content text not null
);