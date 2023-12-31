PGDMP                  	    {            alfa    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    alfa    DATABASE     {   CREATE DATABASE alfa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE alfa;
                postgres    false            �            1259    16400    client    TABLE     b   CREATE TABLE public.client (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    16399    client_id_seq    SEQUENCE     �   CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          postgres    false    216                        0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          postgres    false    215            �            1259    16407    module    TABLE     b   CREATE TABLE public.module (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.module;
       public         heap    postgres    false            �            1259    16406    module_id_seq    SEQUENCE     �   CREATE SEQUENCE public.module_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.module_id_seq;
       public          postgres    false    218                       0    0    module_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.module_id_seq OWNED BY public.module.id;
          public          postgres    false    217            �            1259    16414    ticket    TABLE     �   CREATE TABLE public.ticket (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    fk_id_client integer,
    opening_date timestamp without time zone NOT NULL,
    closing_date timestamp without time zone,
    fk_id_module integer
);
    DROP TABLE public.ticket;
       public         heap    postgres    false            �            1259    16413    ticket_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ticket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.ticket_id_seq;
       public          postgres    false    220                       0    0    ticket_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.ticket_id_seq OWNED BY public.ticket.id;
          public          postgres    false    219            Z           2604    16403 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            [           2604    16410 	   module id    DEFAULT     f   ALTER TABLE ONLY public.module ALTER COLUMN id SET DEFAULT nextval('public.module_id_seq'::regclass);
 8   ALTER TABLE public.module ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            \           2604    16417 	   ticket id    DEFAULT     f   ALTER TABLE ONLY public.ticket ALTER COLUMN id SET DEFAULT nextval('public.ticket_id_seq'::regclass);
 8   ALTER TABLE public.ticket ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    16400    client 
   TABLE DATA           *   COPY public.client (id, name) FROM stdin;
    public          postgres    false    216   �       �          0    16407    module 
   TABLE DATA           *   COPY public.module (id, name) FROM stdin;
    public          postgres    false    218   (       �          0    16414    ticket 
   TABLE DATA           c   COPY public.ticket (id, title, fk_id_client, opening_date, closing_date, fk_id_module) FROM stdin;
    public          postgres    false    220   t                  0    0    client_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.client_id_seq', 1, false);
          public          postgres    false    215                       0    0    module_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.module_id_seq', 1, false);
          public          postgres    false    217                       0    0    ticket_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ticket_id_seq', 226, true);
          public          postgres    false    219            ^           2606    16405    client client_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    216            `           2606    16412    module module_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.module
    ADD CONSTRAINT module_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.module DROP CONSTRAINT module_pkey;
       public            postgres    false    218            b           2606    16419    ticket ticket_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_pkey;
       public            postgres    false    220            c           2606    16420    ticket ticket_fk_id_client_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_fk_id_client_fkey FOREIGN KEY (fk_id_client) REFERENCES public.client(id);
 I   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_fk_id_client_fkey;
       public          postgres    false    220    216    4702            d           2606    16425    ticket ticket_fk_id_module_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_fk_id_module_fkey FOREIGN KEY (fk_id_module) REFERENCES public.module(id);
 I   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_fk_id_module_fkey;
       public          postgres    false    220    218    4704            �   @   x�3�t,(�IU��K��2�t��O�I�2���L.�/�O+�2�I-�I�2�.HLN������� Ё�      �   <   x�3�t��K�KN�,��2�K�KI,�2�t�(HM�<����|.N����Ԓ�b�=... �S�      �   0  x���=��V��Z\7���_�R�pa @�4�ł���E�{�:��\��h��{@�pa`~x�{�;�����u-?ߗ߿_��y.�O�i./���q
�X��J��PV����Z�,��|��1��x{���2ί�<���m(o�<QT}�{�O㭜n�������p�?��b���mn�p�����X�y=��R����s|��<�g2�巗��Q�_�i��N�r���q�����co�N,�ӟ��.=�˗mz��qzg���P��/5 ��'0�T�|����@��P�ʄ�aZf���С+ �Y���
XA���y�p�� PV 0�Y���
 �AV�9��-������CW�S=�J��	�
/)�+���w�+�W�vN��9�Rc� �7B�@�����P^o� ��Y�+�����b���J��@�|�
b��#W ^s�
�j�X�8�+�W��R�<��
Z ` � ^BW�{����J�� N� `p �B+� �>�V 0=��k*x{q���߉�
&MBW�S[���
|��V�{�Q+HE�!+��-�7k�?�FHE[�.*�:l�!��6�:l�lHYF7d�P�)�.�e�C
��!�t@;d�P��)�h��[E�R��)�j��3���!~��C�s�!e�y��z;��R���5Ho�o���۾�=�)�i��e�C���!����b�[퐁B��C���
��~����Wl�R�[��8��"�������IzCĝ,9Щ����AzGĝ �9�*����D�Z�
�>_�tb"�-?�6j"�9�s있_���ѭ��IzQ�9a"�9�i�fDEҫ"�F�Ί��XVW�$=,rP�VHNZ�0�-r�9Ǯ��e�EꝖ��H=�9�)�f$F�#�T�vd̶Uo-�2r��9�8(GMvB#�������9vk�-9�Wi�%�~�-�^)�r#:��Ì��w?H��֋#��ɑ����Izt��:���/2���aFw|����n5zx��<▜2��9Io���Gt�#����������:�O��7΍ �k��
$%�z��9Z�@r�S 9�(��Hα$�\k��Iz���@r�S ��Zg�چ�}�����F��>!�@r�U qIN�N/���ܽ�r�H3
$�w�d��IY�U 9I/���7p�vS qL���(��Hα$gY����H�
$��)�+��^�����(��5�$������Iz���@�`�)�fH�$��@r�U q)��H�
$��[Q���'i     