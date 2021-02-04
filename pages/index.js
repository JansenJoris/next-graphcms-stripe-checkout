import Link from "next/link";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";

import Layout from "../components/Layout";
import { formatPrice } from "../components/helper";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export async function getStaticProps() {
  const { products } = await graphcms.request(
    gql`
      {
        products {
          id
          name
          price
          slug
          images {
            id
            url(
              transformation: {
                image: { resize: { width: 500, height: 500, fit: crop } }
              }
            )
            fileName
            height
            width
          }
        }
      }
    `
  );

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <Layout title="NextJS GraphCMS Stripe Checkout">
      <ul className="text-xl my-10 grid grid-cols-3 gap-5">
        {products.map(({ id, name, price, slug, images }) => {
          return (
            <li
              key={id}
              className="flex flex-col items-center gap-5 bg-white rounded-md shadow-md p-5"
            >
              {images.length > 0 && (
                <Image
                  src={images[0].url}
                  width={500} // could be images[0].width however value is 1000
                  height={500} // could be images[0].height however value is 1000
                  alt={images[0].fileName}
                />
              )}
              <div>
                <Link key={id} href={`products/${slug}`}>
                  <a>{name}</a>
                </Link>
                <div className="font-bold mt-3">{formatPrice(price)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
