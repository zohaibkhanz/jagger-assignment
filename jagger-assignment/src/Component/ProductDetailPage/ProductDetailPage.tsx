import React from 'react';
import styles from './ProductDetailPage.module.css';
import imageIcon from '/public/icons/package.svg';
import favoriteIcon from '/public/icons/favorite.svg';
import factsSoft from '/public/icons/facts-soft.svg';
import cart from '/public/icons/cart.svg';
import filledStar from '/public/icons/star-filled.svg';
import star from '/public/icons/star.svg';
import discount from '/public/icons/discount.svg';
import add from '/public/icons/add.svg';
import attachmentIcon from '/public/icons/attachment.svg';

interface Attachment {
    file_label: string;
    file_size: number;
    file_name: string;
    file_link: string;
}

interface Article {
    id: number;
    title: string;
    description_short: string;
    description_long: string;
    supplier_name: string;
    supplier_link: string;
    stars: number;
    price: number;
    price_breaks: Record<string, number>;
    currency: string;
    transport_costs: number;
    vat_percent: number;
    images: string[];
    minimum_order_quantity: number;
    delivery_time: number;
    unit: string;
    features: Record<string, string>;
    attachments: Attachment[];
    keywords: string[];
}

interface ProductDetailPageProps {
    data: { article: Article };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ data }) => {
    const article = data.article;

    return (
        <div className={styles.container}>
            <div className={styles.topHeader}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.iconContainer}>
                    <img src={favoriteIcon} alt="wishlist" className={styles.icon} />
                    <img src={factsSoft} alt="factsSoft" className={styles.icon} />
                    <img src={cart} alt="cart" className={styles.icon} />
                </div>

            </div>

            <div className={styles.mainContainer}>
                <div className={styles.mainSection}>

                    <div className={styles.imageGallery}>
                        <div className={styles.thumbnailColumn}>
                            {article.images.slice(0, 2).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={imageIcon}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className={styles.thumbnail}
                                />
                            ))}
                        </div>
                        <div className={styles.mainImageContainer}>
                            <img src={imageIcon} alt="Main product" className={styles.mainImage} />
                        </div>
                    </div>

                    <div className={styles.productInfo}>
                        <div>
                            <div className={styles.shortDescription}>{article.description_short}</div>
                            <div className={styles.supplier}>
                                by <a href={article.supplier_link}>{article.supplier_name}</a>
                            </div>
                            <div className={styles.iconContainer}>
                                <img src={filledStar} alt="filledStar" className={styles.icon} />
                                <img src={filledStar} alt="filledStar" className={styles.icon} />
                                <img src={filledStar} alt="filledStar" className={styles.icon} />
                                <img src={star} alt="star" className={styles.icon} />
                                <img src={star} alt="star" className={styles.icon} />
                            </div>
                            <div className={styles.price}>
                                {article?.price?.toFixed(2)} {article.currency} +{' '}
                                {article?.transport_costs?.toFixed(2)} {article.currency} shipping
                                <span>
                                    <img src={discount} alt="percentage" className={styles.discountIcon} />
                                </span>
                            </div>
                            <div className={styles.taxNote}>
                                all prices incl. {article.vat_percent}% taxes
                            </div>
                        </div>

                        <div className={styles.orderControls}>
                            <input
                                type="number"
                                min={article.minimum_order_quantity}
                                defaultValue={article.minimum_order_quantity}
                                className={styles.quantityInput}
                            />{' '}
                            <span>PCE</span>
                            <button className={styles.addToCart}>
                                <span>
                                    <img src={add} alt="add" className={styles.addIcon} />
                                </span>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.detailsWrapper}>
                    <section className={styles.descriptionSection}>
                        <div className={styles.description}>Description</div>
                        <p>{article?.description_long}</p>
                    </section>

                    <div className={styles.gridRow}>
                        <div className={styles.detailsSection}>
                            <div className={styles.headerText}>Details</div>
                            <div className={styles.featuresHeader}>Features</div>
                            <ul>
                                {article.features &&
                                    Object?.entries(article.features).map(([key, value], idx) => (
                                        <li key={idx}>
                                            <span className={styles.featuresKey}>{key}</span>: {value}
                                        </li>
                                    ))}
                            </ul>

                            <div className={styles.featuresHeader}>Attachments</div>
                            <div style={{margin: '8px 22px'}}>
                                {article.attachments?.map((att, idx) => (
                                    <div key={idx}>
                                        <img src={attachmentIcon} alt='attachmentIcon' className={styles.attachIcon} />
                                        <a
                                            href={att.file_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {att.file_label}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.featuresHeader}>Keywords</div>
                            <div className={styles.keywordsContainer}>
                                {article.keywords?.map((keyword, idx) => (
                                    <div key={idx} className={styles.keywordButton}>{keyword}</div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.shippingSection}>
                            <div className={styles.headerText}>Pricing & Shipping</div>
                            <ul>
                                <li>
                                    <span className={styles.featuresKey}>Minimum order:</span>{' '}
                                    {article.minimum_order_quantity} {article.unit}
                                </li>
                                <li>
                                    <span className={styles.featuresKey}>Shipping:</span>{' '}
                                    {article.transport_costs?.toFixed(2)} {article.currency}
                                </li>
                                <li>
                                    <span className={styles.featuresKey}>Delivery:</span>{' '}
                                    {article.delivery_time} days
                                </li>
                            </ul>

                            <div className={styles.featuresHeader}>Price Breaks</div>
                            <div style={{margin: '8px 22px'}}>
                                {article.price_breaks &&
                                    Object.entries(article.price_breaks).map(([qty, price], idx) => (
                                        <div className={styles.priceBreak} key={idx}>{`ex ${qty} ${article.unit} - ${price.toFixed(
                                            2
                                        )} ${article.currency}/${article.unit}`}</div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
