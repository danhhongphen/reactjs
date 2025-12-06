import { useEffect, useState } from "react";
import { FetchAllBookAPI, FetchAllUserAPI } from "../components/service/api.service";
import BookTableComponent from "../components/book/BookTableComponent";
import BookFormComponent from "../components/book/BookFormComponent";
import BookFormUnControlComponent from "../components/book/BookFormUncontrolComponent";


const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);

    const [current, setCurrent] = useState("1");
    const [pageSize, setPageSize] = useState("10");
    const [total, setTotal] = useState(0);

    const fetchBooks = async () => {
        console.log("run fetch books");
        const response = await FetchAllBookAPI(current, pageSize);
        if (response.data) {
            setDataBook(response.data.result);
            if (+current !== +response.data.meta.current) {
                setCurrent(response.data.meta.current);
            }
            if (+pageSize !== +response.data.meta.pageSize) {
                setPageSize(response.data.meta.pageSize);
            }
            setTotal(response.data.meta.total);
        }
    };

    useEffect(() => {
        console.log("useEffect book")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBooks();
    }, [current, pageSize]);

    console.log("render....")

    return (
        <>
            <div>
                <BookFormUnControlComponent fetchBooks={fetchBooks} />
                <BookTableComponent
                    dataBook={dataBook}
                    fetchBooks={fetchBooks}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    setTotal={setTotal}
                />
            </div>
        </>
    );
}

export default BookPage;