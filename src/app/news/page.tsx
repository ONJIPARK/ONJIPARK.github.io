import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Newsletter } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter , home } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: home.image,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}/news`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40" s={{ gap: "24" }}>
        <Posts thumbnail />
        <Newsletter marginBottom="l" />
      </Column>
    </Column>
  );
}
