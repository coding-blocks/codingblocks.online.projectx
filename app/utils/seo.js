import config from 'codingblocks-online/config/environment'
import moment from 'moment'

export const getSeoSchemaForCourse = (course, ratings) => {
  const data = {
    "@context": "http://schema.org/",
    "@type": "Course",
    "name": course.title,
    "description": course.subtitle,
    "image": [
      course.logo
    ],
    "provider": {
      "@type": "Organization",
      "name": "Coding Blocks",
      "sameAs": "https://online.codingblocks.com/"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": ratings.length > 0 ? ratings[0].value : 5,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": ratings.length > 0 ? ratings[0].user.firstname + ' '
          + ratings[0].user.lastname : 'Abhishek Gupta'
      }
    },
    "url": `${config.publicUrl}/courses/${course.slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": (parseInt(course.id) * 9) || 40
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "priceValidUntil": course.get("activeRuns.length") > 0 ?
        moment.unix(course.get("activeRuns.firstObject.enrollmentEnd")).format('YYYY-MM-DD')
        : moment.unix(Date.now() / 1000).format('YYYY-MM-DD'),
      "price": Math.min(...course.runs.map(r => r.price)),
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Coding Blocks"
      },
      "url": `${config.publicUrl}/courses/${course.slug}`
    }

  }

  return JSON.stringify(data)
}

export const getSeoSchemaForAllCourses = (courses, callingPage) => {
  const items = courses.map((course, index) => ({
    "@type": "ListItem",
    "position": index+1,
    "item": {
      "@context": "http://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.subtitle,
      "provider": {
        "@type": "Organization",
        "name": "Coding Blocks",
        "sameAs": "https://online.codingblocks.com/"
      },
      "url": callingPage ? `${config.publicUrl}/${callingPage}#${course.slug}` : `${config.publicUrl}/#${course.slug}`
    }
  }))

  const data = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    "itemListElement": items
  }

  return JSON.stringify(data)
}