// 'use client'
// import { Breadcrumb } from "antd";
// import { useRouter } from "next/router";


// const BreadCrumbs = () => {
//     const router = useRouter();
//     const { pathname, query } = router;

//     const pathSegments = pathname.split("/").filter((segment) => segment);
//     const breadcrumbItems = pathSegments.map((segment, index) => {
//         const url = "/" + pathSegments.slice(0, index + 1).join("/");
//         const isLast = index === pathSegments.length - 1;
//         let label = segment;

//         if (segment === "[id]" && query.id) {
//             label = query.id;
//         }

//         return (
//             <Breadcrumb.Item key={url}>
//                 {isLast ? (
//                     label
//                 ) : (
//                     <a href={url}>{label}</a>
//                 )}
//             </Breadcrumb.Item>
//         );
//     });

//     return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
// };

// export default BreadCrumbs;