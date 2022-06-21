<template>
    <Layout>
        <div>
            <h1>Post2</h1>
            <ul>
                <li v-for="edge in $page.posts.edges" :key="edge.node.id">
                    <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
                </li>
            </ul>
        </div>
    </Layout>
</template>

<page-query>
query {
    posts: allPost {
        edges {
            node {
                id
                title
                path
            }
        }
    }
}
</page-query>

<script>
export default {
    name: 'Posts2',
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style scoped lang="scss"></style>
