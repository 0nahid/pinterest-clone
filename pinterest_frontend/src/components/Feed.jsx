import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import { client } from "../client"
import { feedQuery, searchQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout.jsx"
import Spinner from "./Spinner.jsx"
export default function Feed() {
    const [loading, setLoading] = useState(true)
    const [pins, setPins] = useState(null)
    const { categoryId } = useParams();
    useEffect(() => {
        if (categoryId) {
          setLoading(true);
          const query = searchQuery(categoryId);
          client.fetch(query).then((data) => {
            setPins(data);
            setLoading(false);
          });
        } else {
          setLoading(true);
          client.fetch(feedQuery).then((data) => {
            setPins(data);
            setLoading(false);
          });
        }
      }, [categoryId]);

    if(loading) return <Spinner message="We are adding new ideas to your feed!" />
    return (
        <div>
            {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}
