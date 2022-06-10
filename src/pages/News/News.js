import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const News = () => {
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        console.log("fetching")
        if (isLoading) {
            axios(`http://localhost:3000/news?_page=${page}&_limit=4`)
                .then((res) => {
                    setNews([...news, ...res.data])
                    setPage(prev => prev + 1)
                    setTotalCount(res.headers["x-total-count"])
                }).finally(() => setIsLoading(false))
        }
    }, [isLoading])



    useEffect(() => {
        document.addEventListener("scroll", scrollHendler)
        return function () {
            document.removeEventListener("scroll", scrollHendler)
        }
    },[isLoading])

    const scrollHendler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 250 && news.length < totalCount){
            setIsLoading(true)
        }
    }


    return (
        <section className="news">

            <BreadCrums name={"Новости"}/>


            <div className="container">
                <div className="news-title">
                    Новости
                </div>

                {news?.map((it, idx) => {
                    return (
                        <div key={idx} className="news-block">

                            <div className="news-img">
                                <img src={it.image} alt=""/>
                            </div>

                            <div className="news-content">
                                <div className="news-content-title">
                                    {it.title}
                                </div>
                                <div className="news-content-text">
                                    {it.discription}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default News;