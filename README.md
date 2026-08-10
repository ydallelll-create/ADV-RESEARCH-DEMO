import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from tkinter import simpledialog
from tkinter import filedialog
import os
import json
import shutil
import webbrowser
import subprocess
import sys
import re
from datetime import datetime

try:
    from PIL import Image, ImageTk, ImageGrab
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False


# ============================================================
# ADV RESEARCH V2.2
# Researcher & Programmer:
# Yassine Bechir Dallel
# ============================================================

APP_NAME = "ADV RESEARCH"
VERSION = "2.2"
AUTHOR = "Yassine Bechir Dallel"

BASE_FOLDER = "ADV_RESEARCH_DATA"

MATH_FOLDER = os.path.join(
    BASE_FOLDER,
    "Mathematics"
)

PHYSICS_FOLDER = os.path.join(
    BASE_FOLDER,
    "Physics"
)

os.makedirs(
    MATH_FOLDER,
    exist_ok=True
)

os.makedirs(
    PHYSICS_FOLDER,
    exist_ok=True
)


# ============================================================
# COLORS
# ============================================================

BLACK = "#000000"
DARK = "#111111"
PANEL = "#181818"
BUTTON = "#252525"
BUTTON_ACTIVE = "#3b3b3b"

WHITE = "#ffffff"
GRAY = "#aaaaaa"
GREEN = "#62d36f"
RED = "#e06060"


# ============================================================
# GLOBAL VARIABLES
# ============================================================

root = tk.Tk()

current_subject = None
current_project = None
current_editor = None
current_metadata = {}
current_media = []

autosave_job = None


# ============================================================
# BASIC FUNCTIONS
# ============================================================

def clear_window():

    global autosave_job

    if autosave_job is not None:

        try:
            root.after_cancel(
                autosave_job
            )
        except:
            pass

        autosave_job = None

    for widget in root.winfo_children():
        widget.destroy()


def now_string():

    return datetime.now().strftime(
        "%d %B %Y - %H:%M"
    )


def safe_name(name):

    forbidden = '<>:"/\\|?*'

    for char in forbidden:
        name = name.replace(
            char,
            "_"
        )

    return name.strip()


def subject_folder(subject):

    if subject == "MATHEMATICS":
        return MATH_FOLDER

    return PHYSICS_FOLDER


def project_folder(
    subject,
    project
):

    return os.path.join(
        subject_folder(subject),
        safe_name(project)
    )


def media_folder(
    subject,
    project
):

    folder = os.path.join(
        project_folder(
            subject,
            project
        ),
        "media"
    )

    os.makedirs(
        folder,
        exist_ok=True
    )

    return folder


def research_path(
    subject,
    project
):

    return os.path.join(
        project_folder(
            subject,
            project
        ),
        "research.txt"
    )


def metadata_path(
    subject,
    project
):

    return os.path.join(
        project_folder(
            subject,
            project
        ),
        "metadata.json"
    )


def references_path(
    subject,
    project
):

    return os.path.join(
        project_folder(
            subject,
            project
        ),
        "references.json"
    )


def media_path(
    subject,
    project
):

    return os.path.join(
        project_folder(
            subject,
            project
        ),
        "media.json"
    )


# ============================================================
# METADATA
# ============================================================

def default_metadata(
    subject,
    project
):

    time = now_string()

    return {
        "title": project,
        "author": AUTHOR,
        "subject": subject,
        "field": "",
        "status": "In Progress",
        "keywords": "",
        "abstract": "",
        "created": time,
        "modified": time
    }


def load_metadata(
    subject,
    project
):

    path = metadata_path(
        subject,
        project
    )

    if not os.path.exists(path):

        data = default_metadata(
            subject,
            project
        )

        save_metadata(
            subject,
            project,
            data
        )

        return data

    try:

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except:

        return default_metadata(
            subject,
            project
        )


def save_metadata(
    subject,
    project,
    data
):

    folder = project_folder(
        subject,
        project
    )

    os.makedirs(
        folder,
        exist_ok=True
    )

    with open(
        metadata_path(
            subject,
            project
        ),
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# REFERENCES
# ============================================================

def load_references(
    subject,
    project
):

    path = references_path(
        subject,
        project
    )

    if not os.path.exists(path):
        return []

    try:

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except:

        return []


def save_references(
    subject,
    project,
    references
):

    with open(
        references_path(
            subject,
            project
        ),
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            references,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# MEDIA
# ============================================================

def load_media(
    subject,
    project
):

    path = media_path(
        subject,
        project
    )

    if not os.path.exists(path):
        return []

    try:

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except:

        return []


def save_media(
    subject,
    project,
    media
):

    with open(
        media_path(
            subject,
            project
        ),
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            media,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# BUTTON
# ============================================================

def make_button(
    parent,
    text,
    command,
    width=12
):

    return tk.Button(

        parent,

        text=text,

        command=command,

        width=width,

        font=(
            "Arial",
            10,
            "bold"
        ),

        fg=WHITE,

        bg=BUTTON,

        activeforeground=WHITE,

        activebackground=BUTTON_ACTIVE,

        relief="flat",

        cursor="hand2"
    )


# ============================================================
# HOME
# ============================================================

def show_home():

    clear_window()

    root.title(
        APP_NAME
        + " "
        + VERSION
    )


    tk.Label(

        root,

        text=APP_NAME,

        font=(
            "Arial",
            40,
            "bold"
        ),

        fg=WHITE,

        bg=BLACK
    ).pack(
        pady=(55, 5)
    )


    tk.Label(

        root,

        text="VERSION "
        + VERSION,

        font=(
            "Arial",
            12
        ),

        fg=GRAY,

        bg=BLACK
    ).pack()


    tk.Label(

        root,

        text=(
            '"God does not play dice '
            'with the universe."'
        ),

        font=(
            "Times New Roman",
            17,
            "italic"
        ),

        fg=WHITE,

        bg=BLACK
    ).pack(
        pady=(55, 5)
    )


    tk.Label(

        root,

        text="- Albert Einstein",

        font=(
            "Times New Roman",
            11,
            "italic"
        ),

        fg=GRAY,

        bg=BLACK
    ).pack()


    make_button(

        root,

        "MATHEMATICS",

        lambda: show_subject(
            "MATHEMATICS"
        ),

        25
    ).pack(
        pady=(40, 8),
        ipady=6
    )


    make_button(

        root,

        "PHYSICS",

        lambda: show_subject(
            "PHYSICS"
        ),

        25
    ).pack(
        pady=8,
        ipady=6
    )


    make_button(

        root,

        "SEARCH RESEARCH",

        show_search,

        20
    ).pack(
        pady=(25, 8)
    )


    tk.Label(

        root,

        text=(
            "Researcher & Programmer\n"
            + AUTHOR
        ),

        font=(
            "Arial",
            10
        ),

        fg=GRAY,

        bg=BLACK
    ).pack(
        side="bottom",
        pady=18
    )


# ============================================================
# SUBJECT PAGE
# ============================================================

def show_subject(subject):

    clear_window()

    tk.Label(

        root,

        text=subject,

        font=(
            "Arial",
            30,
            "bold"
        ),

        fg=WHITE,

        bg=BLACK
    ).pack(
        pady=(20, 10)
    )


    make_button(

        root,

        "< HOME",

        show_home,

        10
    ).pack(
        pady=(0, 10)
    )


    search_var = tk.StringVar()


    search = tk.Entry(

        root,

        textvariable=search_var,

        font=(
            "Arial",
            12
        ),

        fg=WHITE,

        bg=PANEL,

        insertbackground=WHITE,

        relief="flat"
    )

    search.pack(
        fill="x",
        padx=80,
        ipady=7,
        pady=10
    )


    search.insert(
        0,
        "Search research..."
    )


    list_frame = tk.Frame(
        root,
        bg=BLACK
    )

    list_frame.pack(
        fill="both",
        expand=True,
        padx=80,
        pady=10
    )


    scrollbar = tk.Scrollbar(
        list_frame
    )

    scrollbar.pack(
        side="right",
        fill="y"
    )


    project_list = tk.Listbox(

        list_frame,

        font=(
            "Arial",
            13
        ),

        fg=WHITE,

        bg=PANEL,

        selectbackground=BUTTON_ACTIVE,

        selectforeground=WHITE,

        activestyle="none",

        yscrollcommand=scrollbar.set
    )

    project_list.pack(
        side="left",
        fill="both",
        expand=True
    )


    scrollbar.config(
        command=project_list.yview
    )


    def refresh():

        project_list.delete(
            0,
            tk.END
        )

        query = search_var.get().lower()

        if query == "search research...":
            query = ""

        folder = subject_folder(
            subject
        )

        try:

            names = os.listdir(
                folder
            )

        except:

            names = []


        names.sort()


        for name in names:

            path = os.path.join(
                folder,
                name
            )

            if not os.path.isdir(path):
                continue


            if query and query not in name.lower():
                continue


            data = load_metadata(
                subject,
                name
            )


            status = data.get(
                "status",
                "In Progress"
            )


            if status == "Completed":
                icon = "[DONE]"

            elif status == "Needs Work":
                icon = "[WORK]"

            else:
                icon = "[OPEN]"


            project_list.insert(

                tk.END,

                icon
                + "  "
                + name
                + "  |  "
                + status
            )


    refresh()


    search.bind(
        "<FocusIn>",
        lambda event: (
            search.delete(
                0,
                tk.END
            )
            if search.get()
            == "Search research..."
            else None
        )
    )


    search_var.trace_add(
        "write",
        lambda *args: refresh()
    )


    def open_selected():

        selected = project_list.curselection()

        if not selected:

            messagebox.showwarning(
                APP_NAME,
                "Select a research first."
            )

            return


        text = project_list.get(
            selected[0]
        )


        text = re.sub(
            r"^\[[^\]]+\]\s+",
            "",
            text
        )


        project = text.split(
            "  |  "
        )[0].strip()


        show_editor(
            subject,
            project
        )


    project_list.bind(
        "<Double-Button-1>",
        lambda event: open_selected()
    )


    def new_project():

        title = simpledialog.askstring(

            "New Research",

            "Enter the research title:",

            parent=root
        )


        if not title:
            return


        title = safe_name(
            title
        )


        folder = project_folder(
            subject,
            title
        )


        if os.path.exists(folder):

            messagebox.showwarning(
                APP_NAME,
                "This research already exists."
            )

            return


        os.makedirs(
            media_folder(
                subject,
                title
            ),
            exist_ok=True
        )


        data = default_metadata(
            subject,
            title
        )


        save_metadata(
            subject,
            title,
            data
        )


        save_references(
            subject,
            title,
            []
        )


        save_media(
            subject,
            title,
            []
        )


        with open(
            research_path(
                subject,
                title
            ),
            "w",
            encoding="utf-8"
        ) as file:

            file.write("")


        show_editor(
            subject,
            title
        )


    controls = tk.Frame(
        root,
        bg=BLACK
    )

    controls.pack(
        pady=15
    )


    make_button(
        controls,
        "+ NEW RESEARCH",
        new_project,
        18
    ).pack(
        side="left",
        padx=5
    )


    make_button(
        controls,
        "OPEN",
        open_selected,
        12
    ).pack(
        side="left",
        padx=5
    )


# ============================================================
# EDITOR
# ============================================================

def show_editor(
    subject,
    project
):

    global current_subject
    global current_project
    global current_editor
    global current_metadata
    global current_media
    global autosave_job


    clear_window()


    current_subject = subject
    current_project = project


    metadata = load_metadata(
        subject,
        project
    )


    current_metadata = metadata


    current_media = load_media(
        subject,
        project
    )


    root.title(
        APP_NAME
        + " - "
        + project
    )


    # ========================================================
    # TOP
    # ========================================================

    top = tk.Frame(
        root,
        bg=BLACK
    )

    top.pack(
        fill="x",
        padx=20,
        pady=10
    )


    title_label = tk.Label(

        top,

        text=project,

        font=(
            "Arial",
            22,
            "bold"
        ),

        fg=WHITE,

        bg=BLACK
    )

    title_label.pack(
        side="left"
    )


    save_label = tk.Label(

        top,

        text="",

        font=(
            "Arial",
            10
        ),

        fg=GREEN,

        bg=BLACK
    )

    save_label.pack(
        side="right"
    )


    # ========================================================
    # INFO
    # ========================================================

    info = tk.Frame(
        root,
        bg=PANEL
    )

    info.pack(
        fill="x",
        padx=25
    )


    def info_text():

        return (

            "AUTHOR: "
            + metadata.get(
                "author",
                AUTHOR
            )
            + "    |    SUBJECT: "
            + metadata.get(
                "subject",
                subject
            )
            + "    |    CREATED: "
            + metadata.get(
                "created",
                "-"
            )
            + "    |    MODIFIED: "
            + metadata.get(
                "modified",
                "-"
            )
        )


    info_label = tk.Label(

        info,

        text=info_text(),

        fg=GRAY,

        bg=PANEL,

        font=(
            "Arial",
            9
        ),

        anchor="w"
    )

    info_label.pack(
        fill="x",
        padx=15,
        pady=8
    )


    # ========================================================
    # TOOLBAR
    # ========================================================

    toolbar = tk.Frame(
        root,
        bg=BLACK
    )

    toolbar.pack(
        fill="x",
        padx=25,
        pady=5
    )


    # ========================================================
    # EDITOR
    # ========================================================

    editor_frame = tk.Frame(
        root,
        bg=BLACK
    )

    editor_frame.pack(
        fill="both",
        expand=True,
        padx=25,
        pady=5
    )


    scrollbar = tk.Scrollbar(
        editor_frame
    )

    scrollbar.pack(
        side="right",
        fill="y"
    )


    editor = tk.Text(

        editor_frame,

        font=(
            "Times New Roman",
            15
        ),

        fg=WHITE,

        bg=DARK,

        insertbackground=WHITE,

        selectbackground=BUTTON_ACTIVE,

        selectforeground=WHITE,

        wrap="word",

        undo=True,

        maxundo=-1,

        padx=30,

        pady=25,

        spacing1=5,

        spacing2=3,

        spacing3=8,

        yscrollcommand=scrollbar.set
    )


    editor.pack(
        side="left",
        fill="both",
        expand=True
    )


    scrollbar.config(
        command=editor.yview
    )


    current_editor = editor


    # ========================================================
    # FORMATTING
    # ========================================================

    editor.tag_configure(

        "title",

        font=(
            "Arial",
            25,
            "bold"
        ),

        justify="center",

        spacing3=15
    )


    editor.tag_configure(

        "heading",

        font=(
            "Arial",
            19,
            "bold"
        ),

        spacing1=15,

        spacing3=10
    )


    editor.tag_configure(

        "bold",

        font=(
            "Times New Roman",
            15,
            "bold"
        )
    )


    editor.tag_configure(

        "italic",

        font=(
            "Times New Roman",
            15,
            "italic"
        )
    )


    editor.tag_configure(

        "equation",

        font=(
            "Cambria Math",
            16
        ),

        justify="center",

        spacing1=10,

        spacing3=10
    )


    editor.tag_configure(

        "media",

        foreground=GREEN,

        font=(
            "Arial",
            12,
            "bold"
        ),

        spacing1=8,

        spacing3=8
    )


    # ========================================================
    # LOAD TEXT
    # ========================================================

    path = research_path(
        subject,
        project
    )


    if os.path.exists(path):

        try:

            with open(
                path,
                "r",
                encoding="utf-8"
            ) as file:

                content = file.read()


            editor.insert(
                "1.0",
                content
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                str(error)
            )


    # ========================================================
    # DEFAULT HEADER
    # ========================================================

    if not editor.get(
        "1.0",
        "end-1c"
    ).strip():

        editor.insert(
            "1.0",
            project
            + "\n\n"
        )


        editor.tag_add(
            "title",
            "1.0",
            "1.end"
        )


        editor.insert(
            "end",
            AUTHOR
            + "\n"
        )


        editor.insert(
            "end",
            metadata.get(
                "subject",
                subject
            )
            + "\n"
        )


        editor.insert(
            "end",
            "Created: "
            + metadata.get(
                "created",
                "-"
            )
            + "\n"
        )


        editor.insert(
            "end",
            "Last modified: "
            + metadata.get(
                "modified",
                "-"
            )
            + "\n\n"
        )


        editor.insert(
            "end",
            "ABSTRACT\n\n"
        )


    # ========================================================
    # COPY / CUT / PASTE
    # ========================================================

    def copy_text():

        try:

            selected = editor.get(
                "sel.first",
                "sel.last"
            )

            root.clipboard_clear()

            root.clipboard_append(
                selected
            )

            root.update()

        except:
            pass


    def cut_text():

        try:

            copy_text()

            editor.delete(
                "sel.first",
                "sel.last"
            )

        except:
            pass


    def paste_text():

        try:

            text = root.clipboard_get()

            editor.insert(
                "insert",
                text
            )

        except:

            messagebox.showinfo(
                APP_NAME,
                "No text is available on the clipboard."
            )


    def select_all():

        editor.tag_add(
            "sel",
            "1.0",
            "end-1c"
        )


    # ========================================================
    # IMAGE INSERTION
    # ========================================================

    def insert_image_file():

        if not PIL_AVAILABLE:

            messagebox.showerror(
                APP_NAME,
                "Pillow is required for images.\n\n"
                "Install Pillow in:\n"
                "Tools -> Manage packages"
            )

            return


        file_path = filedialog.askopenfilename(

            parent=root,

            title="Choose an image",

            filetypes=[

                (
                    "Images",
                    "*.png *.jpg *.jpeg *.gif *.bmp *.webp"
                ),

                (
                    "All files",
                    "*.*"
                )
            ]
        )


        if not file_path:
            return


        try:

            extension = os.path.splitext(
                file_path
            )[1]


            filename = (
                "image_"
                + datetime.now().strftime(
                    "%Y%m%d_%H%M%S_%f"
                )
                + extension
            )


            destination = os.path.join(

                media_folder(
                    subject,
                    project
                ),

                filename
            )


            shutil.copy2(
                file_path,
                destination
            )


            insert_image(
                destination,
                filename
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "Could not insert image:\n\n"
                + str(error)
            )


    def insert_image(
        file_path,
        filename
    ):

        if not os.path.exists(file_path):
            return


        try:

            image = Image.open(
                file_path
            )


            max_width = 650
            max_height = 500


            width, height = image.size


            scale = min(

                max_width / width,

                max_height / height,

                1
            )


            new_size = (

                max(
                    1,
                    int(width * scale)
                ),

                max(
                    1,
                    int(height * scale)
                )
            )


            image = image.resize(
                new_size,
                Image.LANCZOS
            )


            photo = ImageTk.PhotoImage(
                image
            )


            editor.image_create(

                "insert",

                image=photo,

                padx=10,

                pady=10
            )


            editor.insert(
                "insert",
                "\n"
            )


            editor.insert(
                "insert",
                "[IMAGE: "
                + filename
                + "]"
                + "\n"
            )


            start = editor.index(
                "insert - 2 lines"
            )


            end = editor.index(
                "insert - 1 lines"
            )


            editor.tag_add(
                "media",
                start,
                end
            )


            # Keep image alive

            if not hasattr(
                editor,
                "image_references"
            ):

                editor.image_references = []


            editor.image_references.append(
                photo
            )


            current_media.append({

                "type": "image",

                "file": filename,

                "path": file_path
            })


            save_media(
                subject,
                project,
                current_media
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "Could not display image:\n\n"
                + str(error)
            )


    # ========================================================
    # PASTE IMAGE FROM CLIPBOARD
    # ========================================================

    def paste_image():

        if not PIL_AVAILABLE:

            messagebox.showerror(
                APP_NAME,
                "Pillow is required for clipboard images."
            )

            return


        try:

            grabbed = ImageGrab.grabclipboard()


            if isinstance(
                grabbed,
                Image.Image
            ):

                filename = (
                    "clipboard_"
                    + datetime.now().strftime(
                        "%Y%m%d_%H%M%S_%f"
                    )
                    + ".png"
                )


                destination = os.path.join(

                    media_folder(
                        subject,
                        project
                    ),

                    filename
                )


                grabbed.save(
                    destination,
                    "PNG"
                )


                insert_image(
                    destination,
                    filename
                )


                return


            if isinstance(
                grabbed,
                list
            ) and grabbed:

                for file_path in grabbed:

                    extension = os.path.splitext(
                        file_path
                    )[1].lower()


                    if extension in [
                        ".png",
                        ".jpg",
                        ".jpeg",
                        ".gif",
                        ".bmp",
                        ".webp"
                    ]:

                        filename = (
                            "clipboard_"
                            + datetime.now().strftime(
                                "%Y%m%d_%H%M%S_%f"
                            )
                            + extension
                        )


                        destination = os.path.join(

                            media_folder(
                                subject,
                                project
                            ),

                            filename
                        )


                        shutil.copy2(
                            file_path,
                            destination
                        )


                        insert_image(
                            destination,
                            filename
                        )


                        return


            messagebox.showinfo(

                APP_NAME,

                "There is no image on the clipboard."
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "Could not paste image:\n\n"
                + str(error)
            )


    # ========================================================
    # VIDEO
    # ========================================================

    def insert_video():

        file_path = filedialog.askopenfilename(

            parent=root,

            title="Choose a video",

            filetypes=[

                (
                    "Video files",
                    "*.mp4 *.avi *.mkv *.mov *.wmv *.webm"
                ),

                (
                    "All files",
                    "*.*"
                )
            ]
        )


        if not file_path:
            return


        try:

            extension = os.path.splitext(
                file_path
            )[1]


            filename = (
                "video_"
                + datetime.now().strftime(
                    "%Y%m%d_%H%M%S_%f"
                )
                + extension
            )


            destination = os.path.join(

                media_folder(
                    subject,
                    project
                ),

                filename
            )


            shutil.copy2(
                file_path,
                destination
            )


            insert_video_marker(
                filename,
                destination
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "Could not insert video:\n\n"
                + str(error)
            )


    def insert_video_marker(
        filename,
        file_path
    ):

        position = editor.index(
            "insert"
        )


        editor.insert(
            position,
            "\n▶ VIDEO: "
            + filename
            + "\n"
        )


        start = position


        end = editor.index(
            position
            + " + 1 lines"
        )


        editor.tag_add(
            "media",
            start,
            end
        )


        current_media.append({

            "type": "video",

            "file": filename,

            "path": file_path
        })


        save_media(
            subject,
            project,
            current_media
        )


        # Make the inserted line clickable

        editor.tag_bind(

            "media",

            "<Double-Button-1>",

            lambda event: open_media(
                file_path
            )
        )


    def open_media(
        file_path
    ):

        if not os.path.exists(
            file_path
        ):

            messagebox.showerror(
                APP_NAME,
                "The media file could not be found."
            )

            return


        try:

            if sys.platform.startswith(
                "win"
            ):

                os.startfile(
                    file_path
                )

            elif sys.platform == "darwin":

                subprocess.Popen(
                    [
                        "open",
                        file_path
                    ]
                )

            else:

                subprocess.Popen(
                    [
                        "xdg-open",
                        file_path
                    ]
                )

        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                str(error)
            )


    # ========================================================
    # VIDEO LINK
    # ========================================================

    def insert_video_link():

        url = simpledialog.askstring(

            "Video Link",

            "Paste the video URL:",

            parent=root
        )


        if not url:
            return


        position = editor.index(
            "insert"
        )


        editor.insert(

            position,

            "\n▶ VIDEO LINK:\n"
            + url
            + "\n\n"
        )


        start = position


        end = editor.index(
            position
            + " + 2 lines"
        )


        editor.tag_add(
            "media",
            start,
            end
        )


        editor.tag_bind(

            "media",

            "<Double-Button-1>",

            lambda event: webbrowser.open(
                url
            )
        )


    # ========================================================
    # EQUATION
    # ========================================================

    def insert_equation():

        dialog = tk.Toplevel(
            root
        )

        dialog.title(
            "Insert Equation"
        )

        dialog.geometry(
            "700x420"
        )

        dialog.configure(
            bg=BLACK
        )


        tk.Label(

            dialog,

            text="INSERT EQUATION",

            font=(
                "Arial",
                20,
                "bold"
            ),

            fg=WHITE,

            bg=BLACK
        ).pack(
            pady=20
        )


        tk.Label(

            dialog,

            text=(
                "Paste or type your mathematical expression:"
            ),

            fg=GRAY,

            bg=BLACK
        ).pack()


        equation = tk.Entry(

            dialog,

            font=(
                "Cambria Math",
                16
            ),

            fg=WHITE,

            bg=PANEL,

            insertbackground=WHITE,

            relief="flat"
        )


        equation.pack(
            fill="x",
            padx=40,
            pady=20,
            ipady=10
        )


        tk.Label(

            dialog,

            text=(
                "Example:\n\n"
                "d/dt (∂L/∂q̇ᵢ) - ∂L/∂qᵢ = 0"
            ),

            font=(
                "Cambria Math",
                14
            ),

            fg=WHITE,

            bg=PANEL,

            pady=20
        ).pack(
            fill="x",
            padx=40
        )


        def insert():

            value = equation.get().strip()


            if not value:
                return


            position = editor.index(
                "insert"
            )


            editor.insert(
                position,
                "\n\n"
                + value
                + "\n\n"
            )


            end = editor.index(
                position
                + " + 2 lines"
            )


            editor.tag_add(
                "equation",
                position,
                end
            )


            dialog.destroy()


        make_button(

            dialog,

            "INSERT",

            insert,

            12
        ).pack(
            pady=20
        )


        equation.focus_set()


    # ========================================================
    # FORMATTING
    # ========================================================

    def apply_tag(tag):

        try:

            start = editor.index(
                "sel.first"
            )

            end = editor.index(
                "sel.last"
            )


            editor.tag_add(
                tag,
                start,
                end
            )

        except:

            messagebox.showinfo(
                APP_NAME,
                "Select some text first."
            )


    # ========================================================
    # SAVE
    # ========================================================

    def save():

        content = editor.get(
            "1.0",
            "end-1c"
        )


        try:

            with open(
                research_path(
                    subject,
                    project
                ),
                "w",
                encoding="utf-8"
            ) as file:

                file.write(
                    content
                )


            metadata["modified"] = now_string()


            save_metadata(
                subject,
                project,
                metadata
            )


            save_media(
                subject,
                project,
                current_media
            )


            save_label.config(
                text="SAVED"
            )


            info_label.config(
                text=info_text()
            )


            root.after(

                2000,

                lambda: save_label.config(
                    text=""
                )
            )


            return True


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "Could not save:\n\n"
                + str(error)
            )

            return False


    # ========================================================
    # BACK
    # ========================================================

    def back():

        if save():

            show_subject(
                subject
            )


    # ========================================================
    # INFORMATION
    # ========================================================

    def edit_information():

        dialog = tk.Toplevel(
            root
        )

        dialog.title(
            "Research Information"
        )

        dialog.geometry(
            "600x650"
        )

        dialog.configure(
            bg=BLACK
        )


        tk.Label(

            dialog,

            text="RESEARCH INFORMATION",

            font=(
                "Arial",
                20,
                "bold"
            ),

            fg=WHITE,

            bg=BLACK
        ).pack(
            pady=20
        )


        fields = {}


        field_names = [

            ("Title", "title"),

            ("Author", "author"),

            ("Subject", "subject"),

            ("Field", "field"),

            ("Keywords", "keywords"),

            ("Abstract", "abstract")
        ]


        for label, key in field_names:

            tk.Label(

                dialog,

                text=label,

                fg=GRAY,

                bg=BLACK,

                anchor="w"
            ).pack(
                fill="x",
                padx=40,
                pady=(7, 2)
            )


            if key == "abstract":

                widget = tk.Text(

                    dialog,

                    height=5,

                    font=(
                        "Arial",
                        11
                    ),

                    fg=WHITE,

                    bg=PANEL,

                    insertbackground=WHITE,

                    relief="flat"
                )


                widget.pack(
                    fill="x",
                    padx=40
                )


                widget.insert(
                    "1.0",
                    metadata.get(
                        key,
                        ""
                    )
                )

            else:

                widget = tk.Entry(

                    dialog,

                    font=(
                        "Arial",
                        11
                    ),

                    fg=WHITE,

                    bg=PANEL,

                    insertbackground=WHITE,

                    relief="flat"
                )


                widget.pack(
                    fill="x",
                    padx=40,
                    ipady=5
                )


                widget.insert(
                    0,
                    metadata.get(
                        key,
                        ""
                    )
                )


            fields[key] = widget


        tk.Label(

            dialog,

            text="Status",

            fg=GRAY,

            bg=BLACK
        ).pack(
            fill="x",
            padx=40,
            pady=(8, 2)
        )


        status = tk.StringVar(

            value=metadata.get(
                "status",
                "In Progress"
            )
        )


        combo = ttk.Combobox(

            dialog,

            textvariable=status,

            values=[
                "In Progress",
                "Completed",
                "Needs Work"
            ],

            state="readonly"
        )


        combo.pack(
            fill="x",
            padx=40
        )


        def save_info():

            for key, widget in fields.items():

                if isinstance(
                    widget,
                    tk.Text
                ):

                    value = widget.get(
                        "1.0",
                        "end-1c"
                    )

                else:

                    value = widget.get()


                metadata[key] = value


            metadata["status"] = status.get()

            metadata["modified"] = now_string()


            save_metadata(
                subject,
                project,
                metadata
            )


            info_label.config(
                text=info_text()
            )


            dialog.destroy()


        make_button(

            dialog,

            "SAVE INFORMATION",

            save_info,

            20
        ).pack(
            pady=20
        )


    # ========================================================
    # REFERENCES
    # ========================================================

    def show_references():

        references = load_references(
            subject,
            project
        )


        dialog = tk.Toplevel(
            root
        )

        dialog.title(
            "References"
        )

        dialog.geometry(
            "750x550"
        )

        dialog.configure(
            bg=BLACK
        )


        tk.Label(

            dialog,

            text="REFERENCES",

            font=(
                "Arial",
                22,
                "bold"
            ),

            fg=WHITE,

            bg=BLACK
        ).pack(
            pady=20
        )


        ref_list = tk.Listbox(

            dialog,

            font=(
                "Arial",
                12
            ),

            fg=WHITE,

            bg=PANEL,

            selectbackground=BUTTON_ACTIVE,

            selectforeground=WHITE
        )


        ref_list.pack(
            fill="both",
            expand=True,
            padx=30
        )


        def refresh():

            ref_list.delete(
                0,
                tk.END
            )


            for i, ref in enumerate(
                references,
                start=1
            ):

                ref_list.insert(

                    tk.END,

                    "["
                    + str(i)
                    + "] "
                    + ref
                )


        refresh()


        def add():

            value = simpledialog.askstring(

                "Reference",

                "Enter reference:",

                parent=dialog
            )


            if value:

                references.append(
                    value
                )


                save_references(
                    subject,
                    project,
                    references
                )


                refresh()


        def remove():

            selected = ref_list.curselection()


            if not selected:
                return


            references.pop(
                selected[0]
            )


            save_references(
                subject,
                project,
                references
            )


            refresh()


        controls = tk.Frame(
            dialog,
            bg=BLACK
        )


        controls.pack(
            pady=15
        )


        make_button(
            controls,
            "+ ADD",
            add,
            10
        ).pack(
            side="left",
            padx=5
        )


        make_button(
            controls,
            "REMOVE",
            remove,
            10
        ).pack(
            side="left",
            padx=5
        )


        make_button(
            controls,
            "CLOSE",
            dialog.destroy,
            10
        ).pack(
            side="left",
            padx=5
        )


    # ========================================================
    # EXPORT TXT
    # ========================================================

    def export_txt():

        save()


        destination = filedialog.asksaveasfilename(

            parent=root,

            defaultextension=".txt",

            filetypes=[
                (
                    "Text files",
                    "*.txt"
                )
            ],

            initialfile=safe_name(
                project
            ) + ".txt"
        )


        if not destination:
            return


        try:

            with open(
                destination,
                "w",
                encoding="utf-8"
            ) as file:

                file.write(
                    editor.get(
                        "1.0",
                        "end-1c"
                    )
                )


            messagebox.showinfo(
                APP_NAME,
                "Research exported."
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                str(error)
            )


    # ========================================================
    # EXPORT PDF
    # ========================================================

    def export_pdf():

        save()


        try:

            from reportlab.lib.pagesizes import A4

            from reportlab.platypus import (
                SimpleDocTemplate,
                Paragraph,
                Spacer
            )

            from reportlab.lib.styles import (
                getSampleStyleSheet,
                ParagraphStyle
            )

            from reportlab.lib.enums import TA_CENTER

            from reportlab.lib.units import cm

        except ImportError:

            messagebox.showerror(

                APP_NAME,

                "Install ReportLab first:\n\n"
                "Tools -> Manage packages -> reportlab"
            )

            return


        destination = filedialog.asksaveasfilename(

            parent=root,

            defaultextension=".pdf",

            filetypes=[
                (
                    "PDF files",
                    "*.pdf"
                )
            ],

            initialfile=safe_name(
                project
            ) + ".pdf"
        )


        if not destination:
            return


        try:

            document = SimpleDocTemplate(

                destination,

                pagesize=A4,

                rightMargin=2 * cm,

                leftMargin=2 * cm,

                topMargin=2 * cm,

                bottomMargin=2 * cm
            )


            styles = getSampleStyleSheet()


            title_style = ParagraphStyle(

                "Title",

                parent=styles["Title"],

                alignment=TA_CENTER,

                fontSize=20,

                leading=25
            )


            body_style = ParagraphStyle(

                "Body",

                parent=styles["BodyText"],

                fontSize=11,

                leading=17,

                spaceAfter=8
            )


            story = []


            story.append(
                Paragraph(
                    project,
                    title_style
                )
            )


            story.append(
                Paragraph(
                    AUTHOR
                    + "<br/>"
                    + metadata.get(
                        "subject",
                        subject
                    )
                    + "<br/>"
                    + "Created: "
                    + metadata.get(
                        "created",
                        "-"
                    ),
                    body_style
                )
            )


            story.append(
                Spacer(
                    1,
                    20
                )
            )


            content = editor.get(
                "1.0",
                "end-1c"
            )


            content = (
                content
                .replace(
                    "&",
                    "&amp;"
                )
                .replace(
                    "<",
                    "&lt;"
                )
                .replace(
                    ">",
                    "&gt;"
                )
            )


            for paragraph in content.split(
                "\n\n"
            ):

                paragraph = paragraph.strip()


                if not paragraph:
                    continue


                paragraph = paragraph.replace(
                    "\n",
                    "<br/>"
                )


                story.append(
                    Paragraph(
                        paragraph,
                        body_style
                    )
                )


            document.build(
                story
            )


            messagebox.showinfo(
                APP_NAME,
                "PDF exported successfully."
            )


        except Exception as error:

            messagebox.showerror(
                APP_NAME,
                "PDF export failed:\n\n"
                + str(error)
            )


    # ========================================================
    # TOOLBAR BUTTONS
    # ========================================================

    make_button(
        toolbar,
        "COPY",
        copy_text,
        7
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "PASTE",
        paste_text,
        7
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "IMAGE",
        insert_image_file,
        8
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "PASTE IMAGE",
        paste_image,
        12
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "VIDEO",
        insert_video,
        8
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "VIDEO LINK",
        insert_video_link,
        11
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "BOLD",
        lambda: apply_tag("bold"),
        7
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "ITALIC",
        lambda: apply_tag("italic"),
        8
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "HEADING",
        lambda: apply_tag("heading"),
        9
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "EQUATION",
        insert_equation,
        10
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "INFO",
        edit_information,
        7
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "REFERENCES",
        show_references,
        11
    ).pack(
        side="left",
        padx=2
    )


    make_button(
        toolbar,
        "< BACK",
        back,
        8
    ).pack(
        side="right",
        padx=2
    )


    make_button(
        toolbar,
        "SAVE",
        save,
        8
    ).pack(
        side="right",
        padx=2
    )


    make_button(
        toolbar,
        "TXT",
        export_txt,
        7
    ).pack(
        side="right",
        padx=2
    )


    make_button(
        toolbar,
        "PDF",
        export_pdf,
        7
    ).pack(
        side="right",
        padx=2
    )


    # ========================================================
    # KEYBOARD SHORTCUTS
    # ========================================================

    editor.bind(
        "<Control-c>",
        lambda event: (
            copy_text(),
            "break"
        )[1]
    )


    editor.bind(
        "<Control-x>",
        lambda event: (
            cut_text(),
            "break"
        )[1]
    )


    editor.bind(
        "<Control-v>",
        lambda event: (
            paste_text(),
            "break"
        )[1]
    )


    editor.bind(
        "<Control-a>",
        lambda event: (
            select_all(),
            "break"
        )[1]
    )


    editor.bind(
        "<Control-s>",
        lambda event: (
            save(),
            "break"
        )[1]
    )


    editor.bind(
        "<Control-Shift-V>",
        lambda event: (
            paste_image(),
            "break"
        )[1]
    )


    # ========================================================
    # RIGHT CLICK
    # ========================================================

    context_menu = tk.Menu(

        root,

        tearoff=0,

        bg=PANEL,

        fg=WHITE,

        activebackground=BUTTON_ACTIVE,

        activeforeground=WHITE
    )


    context_menu.add_command(
        label="Copy",
        command=copy_text
    )


    context_menu.add_command(
        label="Cut",
        command=cut_text
    )


    context_menu.add_command(
        label="Paste",
        command=paste_text
    )


    context_menu.add_separator()


    context_menu.add_command(
        label="Paste Image",
        command=paste_image
    )


    context_menu.add_command(
        label="Insert Image",
        command=insert_image_file
    )


    context_menu.add_command(
        label="Insert Video",
        command=insert_video
    )


    context_menu.add_separator()


    context_menu.add_command(
        label="Select All",
        command=select_all
    )


    def context(event):

        try:

            context_menu.tk_popup(
                event.x_root,
                event.y_root
            )

        finally:

            context_menu.grab_release()


    editor.bind(
        "<Button-3>",
        context
    )


    # ========================================================
    # AUTOSAVE
    # ========================================================

    def autosave():

        global autosave_job


        if current_editor == editor:

            save()


            autosave_job = root.after(
                30000,
                autosave
            )


    autosave_job = root.after(
        30000,
        autosave
    )


    editor.focus_set()


# ============================================================
# SEARCH
# ============================================================

def show_search():

    clear_window()


    tk.Label(

        root,

        text="SEARCH RESEARCH",

        font=(
            "Arial",
            30,
            "bold"
        ),

        fg=WHITE,

        bg=BLACK
    ).pack(
        pady=30
    )


    search_var = tk.StringVar()


    entry = tk.Entry(

        root,

        textvariable=search_var,

        font=(
            "Arial",
            15
        ),

        fg=WHITE,

        bg=PANEL,

        insertbackground=WHITE,

        relief="flat"
    )


    entry.pack(
        fill="x",
        padx=100,
        ipady=8
    )


    results = tk.Listbox(

        root,

        font=(
            "Arial",
            12
        ),

        fg=WHITE,

        bg=PANEL,

        selectbackground=BUTTON_ACTIVE,

        selectforeground=WHITE
    )


    results.pack(
        fill="both",
        expand=True,
        padx=100,
        pady=20
    )


    all_projects = []


    for subject in [
        "MATHEMATICS",
        "PHYSICS"
    ]:

        folder = subject_folder(
            subject
        )


        try:

            names = os.listdir(
                folder
            )

        except:

            names = []


        for name in names:

            if os.path.isdir(
                os.path.join(
                    folder,
                    name
                )
            ):

                all_projects.append(
                    (
                        subject,
                        name
                    )
                )


    def refresh():

        results.delete(
            0,
            tk.END
        )


        query = search_var.get().lower()


        for subject, project in all_projects:

            data = load_metadata(
                subject,
                project
            )


            searchable = (

                project
                + " "
                + data.get(
                    "keywords",
                    ""
                )
                + " "
                + data.get(
                    "field",
                    ""
                )
                + " "
                + data.get(
                    "abstract",
                    ""
                )
            ).lower()


            if query in searchable:

                results.insert(

                    tk.END,

                    subject
                    + "  |  "
                    + project
                )


    refresh()


    search_var.trace_add(
        "write",
        lambda *args: refresh()
    )


    def open_result():

        selected = results.curselection()


        if not selected:
            return


        text = results.get(
            selected[0]
        )


        subject, project = text.split(
            "  |  ",
            1
        )


        show_editor(
            subject,
            project
        )


    results.bind(
        "<Double-Button-1>",
        lambda event: open_result()
    )


    controls = tk.Frame(
        root,
        bg=BLACK
    )


    controls.pack(
        pady=15
    )


    make_button(
        controls,
        "OPEN",
        open_result,
        12
    ).pack(
        side="left",
        padx=5
    )


    make_button(
        controls,
        "< HOME",
        show_home,
        12
    ).pack(
        side="left",
        padx=5
    )


    entry.focus_set()


# ============================================================
# START
# ============================================================

root.title(
    APP_NAME
    + " "
    + VERSION
)

root.geometry(
    "1250x800"
)

root.minsize(
    950,
    600
)

root.configure(
    bg=BLACK
)


show_home()


root.mainloop()
